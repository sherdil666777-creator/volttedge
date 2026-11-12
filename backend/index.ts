import { router, json, error, db, storage, requireAuth, requireAdminEmailAllowlist, notifications } from '@appdeploy/sdk';

const ADMIN_EMAILS = ['voltedge1209@gmail.com'];
const ADMIN_TOPIC = 'voltedge-admin-alerts';
const TABLES: Record<string,string> = {
  bookings:'electrical_bookings', reviews:'electrical_reviews', gallery:'electrical_gallery',
  inverterBrands:'inverter_brands', inverterModels:'inverter_models', solarBrands:'solar_brands',
  solarProducts:'solar_products', articles:'education_articles', videos:'education_videos', inquiries:'electrical_inquiries',
  settings:'website_settings', products:'electrical_products', services:'electrical_services'
};
const admin = [requireAuth(), requireAdminEmailAllowlist(ADMIN_EMAILS)];
const clean = (v: unknown, n=500) => typeof v === 'string' ? v.trim().slice(0,n) : '';
const obj = (v: unknown) => v && typeof v === 'object' ? v as Record<string,unknown> : {};
const stamp = () => new Date().toISOString();
const ref = () => 'VE-'+stamp().slice(2,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,8).toUpperCase();
type Upload = {name?:string;type?:string;data?:string};
const filesOf = (v:unknown): Upload[] => Array.isArray(v) ? v.slice(0,5) as Upload[] : [];
async function saveFile(file:Upload, folder:string) {
  const type=clean(file.type,100);
  if(!/^(image\/(jpeg|png|webp|gif)|video\/(mp4|webm|quicktime))$/i.test(type)) throw new Error('Only JPG, PNG, WebP, GIF, MP4, WebM and MOV files are accepted.');
  const data=clean(file.data,12000000).replace(/^data:[^;]+;base64,/,'');
  if(!data || !/^[A-Za-z0-9+/=]+$/.test(data)) throw new Error('Invalid upload data.');
  const video=type.startsWith('video/'), bytes=Math.floor(data.length*.75);
  if(bytes>(video?8:4)*1024*1024) throw new Error(video?'Video limit is 8 MB.':'Image limit is 4 MB.');
  const ext=type.split('/')[1].replace('jpeg','jpg').replace('quicktime','mov');
  const path=folder+'/'+ref().toLowerCase()+'.'+ext;
  const [ok]=await storage.write([{path,content:data,contentType:type}]);
  if(!ok) throw new Error('Secure file storage failed.');
  return path;
}
async function signed(items:Record<string,unknown>[]) {
  const paths:string[]=[];
  for(const x of items) {
    if(typeof x.mediaPath==='string') paths.push(x.mediaPath);
    if(Array.isArray(x.mediaPaths)) paths.push(...x.mediaPaths.filter((p):p is string=>typeof p==='string'));
    if(Array.isArray(x.attachmentPaths)) paths.push(...x.attachmentPaths.filter((p):p is string=>typeof p==='string'));
  }
  const urls=paths.length?await storage.url([...new Set(paths)]):[];
  const map=new Map(urls.map(x=>[x.path,x.url]));
  return items.map(x=>({...x,
    mediaUrl:typeof x.mediaPath==='string'?map.get(x.mediaPath)||null:null,
    mediaUrls:Array.isArray(x.mediaPaths)?x.mediaPaths.map(p=>map.get(String(p))||null):[],
    attachmentUrls:Array.isArray(x.attachmentPaths)?x.attachmentPaths.map(p=>map.get(String(p))||null):[]
  }));
}
async function alertAdmin(title:string,body:string) {
  try { await notifications.sendToTopic({topic:ADMIN_TOPIC,notification:{title,body,url:'/'},data:{kind:'admin-update'},ttlSeconds:86400}); }
  catch(e) { console.warn('Push notification unavailable; request remains in admin inbox.',e); }
}
export const handler=router({
 'GET /api/_healthcheck':[async()=>json({message:'Success'})],
 'GET /api/public/platform':[async()=>{
  try {
   const names=['electrical_gallery','electrical_reviews','inverter_brands','inverter_models','solar_brands','solar_products','education_articles','education_videos'];
   const pages=await Promise.all(names.map(n=>db.list(n,{limit:100})));
   const [g,r,ib,im,sb,sp,ar,vd]=pages.map(p=>p.items);
   const approvedR=r.filter(x=>x.status==='approved'), approvedG=g.filter(x=>x.status==='published');
   const ratings=approvedR.map(x=>Number(x.rating)||0).filter(x=>x>=1&&x<=5);
   return json({
    gallery:await signed(approvedG),reviews:await signed(approvedR),
    averageRating:ratings.length?Math.round(ratings.reduce((a,b)=>a+b,0)/ratings.length*10)/10:0,reviewCount:ratings.length,
    inverterBrands:ib,inverterModels:im.filter(x=>x.status==='published'&&x.verified===true),
    solarBrands:sb,solarProducts:sp.filter(x=>x.status==='published'),articles:ar.filter(x=>x.status==='published'),
    videos:vd.filter(x=>x.status==='published')
   });
  } catch(e){console.error('Public platform read failed',e);return error('Public content is temporarily unavailable.',503);}
 }],
 'POST /api/bookings':[async({body})=>{
  const b=obj(body),name=clean(b.name,120),phone=clean(b.phone,40),email=clean(b.email,180),city=clean(b.city,100),address=clean(b.address,500),service=clean(b.service,140),propertyType=clean(b.propertyType,80),details=clean(b.details,3000),date=clean(b.appointmentDate,20);
  if(!name||!phone||!city||!address||!service||!propertyType||details.length<8||!date) return error('Complete all required booking fields and project details.',400);
  if(!/^\+?[0-9\s()-]{7,25}$/.test(phone)) return error('Enter a valid phone number.',400);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))||date<stamp().slice(0,10)) return error('Choose a valid future appointment date.',400);
  try {
   const attachmentPaths:string[]=[];for(const f of filesOf(b.files)) attachmentPaths.push(await saveFile(f,'customer-submissions/bookings'));
   const reference=ref();
   const [id]=await db.tx.add('electrical_bookings',[{id:reference,reference,name,phone,email,city,address,service,propertyType,details,appointmentDate:date,attachmentPaths,status:'pending',createdAt:stamp()}]);
   if(!id)return error('Booking could not be saved. Please use WhatsApp.',503);
   await alertAdmin('New service booking',reference+' · '+service+' · '+name);
   return json({ok:true,reference,status:'pending'},201);
  }catch(e){console.error('Booking save failed',e);return error(e instanceof Error?e.message:'Booking could not be saved.',400);}
 }],
 'POST /api/bookings/track':[async({body})=>{
  const b=obj(body),reference=clean(b.reference,40).toUpperCase(),phone=clean(b.phone,40);
  if(!reference||!phone)return error('Booking reference and phone are required.',400);
  try{const [x]=await db.get<Record<string,unknown>>('electrical_bookings',[reference],{consistent:true});if(!x||x.phone!==phone)return error('No booking matched those details.',404);return json({reference,status:x.status,service:x.service,appointmentDate:x.appointmentDate,updatedAt:x.updatedAt||x.createdAt});}
  catch(e){console.error(e);return error('Booking lookup is unavailable.',503);}
 }],
 'POST /api/reviews':[async({body})=>{
  const b=obj(body),name=clean(b.name,120),phone=clean(b.phone,40),review=clean(b.review,1800),rating=Number(b.rating);
  if(!name||!phone||review.length<8||!Number.isInteger(rating)||rating<1||rating>5)return error('Enter your name, phone, review and a 1–5 star rating.',400);
  try{
   const recent=await db.list('electrical_reviews',{limit:100});
   if(recent.items.some(x=>x.phone===phone&&Date.now()-Date.parse(String(x.createdAt))<30*86400000))return error('A recent review from this phone number is already submitted.',409);
   const f=filesOf(b.files)[0],mediaPath=f?await saveFile(f,'customer-submissions/reviews'):null;
   const [id]=await db.add('electrical_reviews',[{name,phone,review,rating,mediaPath,status:'pending',createdAt:stamp()}]);
   if(!id)return error('Review could not be saved.',503);
   await alertAdmin('Review awaiting approval',name+' · '+rating+'/5 stars');
   return json({ok:true,message:'Thank you. Your review will appear after administrator approval.'},201);
  }catch(e){console.error(e);return error(e instanceof Error?e.message:'Review could not be submitted.',400);}
 }],
 'POST /api/gallery/submit':[async({body})=>{
  const b=obj(body),name=clean(b.name,120),phone=clean(b.phone,40),title=clean(b.title,140),description=clean(b.description,1500),category=clean(b.category,80),files=filesOf(b.files);
  if(!name||!phone||!title||description.length<8||!category||!files.length)return error('Add contact details, project description and at least one file.',400);
  try{
   const mediaPaths:string[]=[];for(const f of files)mediaPaths.push(await saveFile(f,'customer-submissions/gallery'));
   const [id]=await db.add('electrical_gallery',[{name,phone,title,description,category,mediaPaths,status:'pending',featured:false,createdAt:stamp()}]);
   if(!id)return error('Project submission could not be saved.',503);
   await alertAdmin('Project media awaiting moderation',title+' · '+name);
   return json({ok:true,message:'Your project has been submitted for moderation.'},201);
  }catch(e){console.error(e);return error(e instanceof Error?e.message:'Gallery upload failed.',400);}
 }],
 'GET /api/admin/data':[...admin,async()=>{
  try{
   const keys=Object.keys(TABLES),pages=await Promise.all(keys.map(k=>db.list(TABLES[k],{limit:100})));
   const data:Record<string,unknown[]>={};
   for(let i=0;i<keys.length;i++)data[keys[i]]=await signed(pages[i].items);
   return json({data,adminEmail:ADMIN_EMAILS[0]});
  }catch(e){console.error(e);return error('Could not load administrator data.',503);}
 }],
 'POST /api/admin/register':[...admin,async({user})=>{
  try{await notifications.subscribeTopic({userIds:[user!.userId],topic:ADMIN_TOPIC});}catch(e){console.warn('Admin push registration unavailable',e);}
  const page=await db.list('website_settings',{limit:50}),current=page.items.find(x=>x.key==='admin-user');
  if(current)await db.tx.update('website_settings',[{id:current.id,record:{adminUserId:user!.userId,key:'admin-user',updatedAt:stamp()}}],{patch:true});
  else await db.add('website_settings',[{key:'admin-user',adminUserId:user!.userId,updatedAt:stamp()}]);
  return json({ok:true});
 }],
 'POST /api/admin/records':[...admin,async({body})=>{
  const b=obj(body),key=clean(b.collection,40),table=TABLES[key],record=obj(b.record);
  if(!table||['bookings','inquiries'].includes(key))return error('Invalid content collection.',400);
  const cleanRecord: Record<string,unknown>={...record,updatedAt:stamp()};delete cleanRecord.id;
  if(key==='inverterModels'&&cleanRecord.verified===true&&(!/^https:\/\//i.test(clean(cleanRecord.sourceUrl,500))||!/^https:\/\//i.test(clean(cleanRecord.manualUrl,500))))return error('A verified inverter model requires HTTPS manufacturer source and manual URLs.',400);
  try{const[id]=await db.add(table,[cleanRecord]);return id?json({ok:true,id},201):error('Content could not be saved.',503);}catch(e){console.error(e);return error('Content could not be saved.',503);}
 }],
 'PUT /api/admin/records/:id':[...admin,async({body,params})=>{
  const b=obj(body),key=clean(b.collection,40),table=TABLES[key],patch=obj(b.patch);
  if(!table||!params.id||key==='inquiries')return error('Invalid content update.',400);
  if(key==='inverterModels'&&patch.verified===true&&(!/^https:\/\//i.test(clean(patch.sourceUrl,500))||!/^https:\/\//i.test(clean(patch.manualUrl,500))))return error('A verified inverter model requires HTTPS manufacturer source and manual URLs.',400);
  const update: Record<string,unknown>={...patch,updatedAt:stamp()};delete update.id;
  try{const[ok]=await db.tx.update(table,[{id:params.id,record:update}],{patch:true});return ok?json({ok:true}):error('Record not found.',404);}catch(e){console.error(e);return error('Update failed.',503);}
 }],
 'DELETE /api/admin/records/:id':[...admin,async({body,params})=>{
  const key=clean(obj(body).collection,40),table=TABLES[key];
  if(!table||!params.id||['bookings','inquiries'].includes(key))return error('Invalid delete request.',400);
  try{
   const[x]=await db.get<Record<string,unknown>>(table,[params.id],{consistent:true});
   if(x){const paths=[...(typeof x.mediaPath==='string'?[x.mediaPath]:[]),...(Array.isArray(x.mediaPaths)?x.mediaPaths.filter((p):p is string=>typeof p==='string'):[])];if(paths.length)await storage.delete(paths);}
   const[ok]=await db.delete(table,[params.id]);return ok?json({ok:true}):error('Record not found.',404);
  }catch(e){console.error(e);return error('Delete failed.',503);}
 }],
 'POST /api/admin/upload':[...admin,async({body})=>{
  const b=obj(body),title=clean(b.title,140),description=clean(b.description,1500),category=clean(b.category,80),files=filesOf(b.files);
  if(!title||!category||!files.length)return error('Title, category and media files are required.',400);
  try{const mediaPaths:string[]=[];for(const f of files)mediaPaths.push(await saveFile(f,'admin-gallery'));const[id]=await db.add('electrical_gallery',[{title,description,category,mediaPaths,status:'published',featured:b.featured===true,createdAt:stamp(),uploadedBy:ADMIN_EMAILS[0]}]);return id?json({ok:true,id}):error('Gallery record failed.',503);}
  catch(e){console.error(e);return error(e instanceof Error?e.message:'Upload failed.',400);}
 }],
 'PUT /api/admin/bookings/:id':[...admin,async({body,params})=>{
  const b=obj(body),status=clean(b.status,30),note=clean(b.adminNote,1200);
  if(!['pending','accepted','rejected','in-progress','completed'].includes(status))return error('Invalid booking status.',400);
  try{const[ok]=await db.tx.update('electrical_bookings',[{id:params.id,record:{status,adminNote:note,updatedAt:stamp()}}],{patch:true});return ok?json({ok:true}):error('Booking not found.',404);}catch(e){console.error(e);return error('Booking update failed.',503);}
 }]
});
