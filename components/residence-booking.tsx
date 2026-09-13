'use client';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const daysBetween = (a:string,b:string) => Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000);
export function ResidenceBooking(){
 const [today] = useState(()=>iso(new Date()));
 const [month,setMonth]=useState(()=>new Date(Number(today.slice(0,4)),Number(today.slice(5,7))-1,1));
 const [arrival,setArrival]=useState(''); const [departure,setDeparture]=useState('');
 const [guests,setGuests]=useState('2'); const [payment,setPayment]=useState('Demo card · 4242');
 const [confirmed,setConfirmed]=useState(false); const confirmation=useRef<HTMLDivElement>(null);
 const nights=arrival&&departure?daysBetween(arrival,departure):0;
 const valid=arrival>=today&&nights>0&&nights<=30;
 const first=month.getDay(); const length=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
 const choose=(day:string)=>{setConfirmed(false);if(!arrival||departure||day<=arrival){setArrival(day);setDeparture('')}else setDeparture(day)};
 const reset=()=>{setConfirmed(false);setArrival('');setDeparture('')};
 return <section className="residence-booking" id="booking" aria-labelledby="booking-title"><header><span>YOUR TIME HERE</span><h2 id="booking-title">A few days,<br/><em>entirely yours.</em></h2><p>Choose your arrival and departure. Every suite includes breakfast, the forest bath, and an evening at the seasonal table.</p><small>Booking demonstration · sample availability and prices · no reservation or charge is made.</small></header>
 <form onSubmit={e=>{e.preventDefault();if(valid){setConfirmed(true);requestAnimationFrame(()=>confirmation.current?.focus())}}}>
 <div className="booking-calendar"><div className="booking-calendar-nav"><button type="button" aria-label="Previous month" disabled={month.getFullYear()===Number(today.slice(0,4))&&month.getMonth()===Number(today.slice(5,7))-1} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}><ArrowLeft/></button><h3 aria-live="polite">{month.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</h3><button type="button" aria-label="Next month" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}><ArrowRight/></button></div><p>{!arrival||departure?'Choose your arrival date.':'Now choose your departure date.'}</p><div className="booking-days">{['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><span key={d}>{d}</span>)}{Array.from({length:first},(_,i)=><i key={'blank'+i}/>)}{Array.from({length},(_,i)=>{const d=iso(new Date(month.getFullYear(),month.getMonth(),i+1));return <button type="button" key={d} disabled={d<today} onClick={()=>choose(d)} aria-label={`${new Date(d+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}${d===arrival?', arrival':d===departure?', departure':''}`} aria-pressed={d===arrival||d===departure} className={`${d===arrival||d===departure?'selected':''} ${arrival&&departure&&d>arrival&&d<departure?'in-stay':''}`}>{i+1}</button>})}</div></div>
 <div className="booking-fields"><label>Arrival<input type="date" value={arrival} min={today} required onChange={e=>{setArrival(e.target.value);setConfirmed(false)}}/></label><label>Departure<input type="date" value={departure} min={arrival||today} required onChange={e=>{setDeparture(e.target.value);setConfirmed(false)}}/></label><label>Guests<select value={guests} onChange={e=>{setGuests(e.target.value);setConfirmed(false)}}><option value="1">1 guest</option><option value="2">2 guests</option></select></label></div>
 {nights>30&&<p role="alert">Please select a stay of 30 nights or fewer.</p>}
 <fieldset className="booking-payment"><legend>Try a payment option</legend>{['Demo card · 4242','Demo wallet','Pay at the residence'].map(p=><label key={p}><input type="radio" name="payment" checked={p===payment} onChange={()=>{setPayment(p);setConfirmed(false)}}/>{p}</label>)}</fieldset>
 <div className="booking-total"><span>Cedar suite · $480 per night<small>Sample total includes taxes. No extra fees.</small></span><strong>{valid?`$${(nights*480).toLocaleString()}`:'Select dates'}<small>{valid?`${nights} ${nights===1?'night':'nights'} · ${guests} ${guests==='1'?'guest':'guests'}`:'Arrival, then departure'}</small></strong></div>
 <div className="booking-actions"><button type="button" onClick={reset}>Clear dates</button><button type="submit" disabled={!valid}>Preview booking <ArrowRight/></button></div>
 {confirmed&&<div className="booking-confirmation" aria-live="polite" tabIndex={-1} ref={confirmation}><Check/><div><h3>Your sample stay is ready.</h3><p>{arrival} to {departure} · {guests} guests · {payment}</p><p>Demo total ${(nights*480).toLocaleString()}. Nothing was booked or charged.</p><button type="button" onClick={()=>setConfirmed(false)}>Edit this stay</button></div></div>}
 </form></section>;
}
