'use strict';

const wl = 3;
const nl = 3;
const nc = 3;
const mp = new Map();

const ctnr = document.getElementById('container');

function createLineDiv(idx ){
  const dv = document.createElement('div');
  dv.id = idx;
  dv.innerText=idx;
  dv.classList.add('lineDiv');
  ctnr.append( dv );
}

function createCellDiv( cellId ){
  const dv = document.createElement('div');
  dv.id = cellId;
  dv.classList.add( 'cellDiv' );
  const lineId = cellId.split(':')[0];
  document.getElementById( lineId ).append(dv);
}

// Runs Only Once
let ec = 0;
for ( let l = 0; l < nl; l++ ){
  createLineDiv( l );
  for( let c = 0; c < nc; c++ ){
    mp.set( l+':'+c, { pl: (nc+1)*l+c, pc: (nl+1)*c+l });
    createCellDiv(l+':'+c);
  }
  ec++;
}

console.log( 'Lahiru', mp );


function inRange(n, lower, higher ){
  return n === Math.min( higher, Math.max(lower, n));
}

// console.log( inRange( 2, 3, 8 ));
// console.log( inRange( 3, 3, 8 ));
// console.log( inRange( 5, 3, 8 ));
// console.log( inRange( 8, 3, 8 ));
// console.log( inRange( 9, 3, 8 ));

let k = 0;
let r = 0;
let c = 0;
let l = 0;
let pd = 0;
const cond1 = (r, k ) => inRange( r, 0, nl -1) && inRange(k, 0, nc -1);
const cond2 = (l, c ) => inRange( l, 0, nl -1) && inRange(c, 0, nc -1);
let key;
let val;
while ( cond1( r, k) ){
  c = k;
  l = r;
  while (cond2( l, c) ) {
    key=l+':'+c;
    val=mp.get( key );
    val.pd = pd;
    mp.set( key, val );
    pd++;l++;c++;
    // console.log(pd++, l++, c++, val );
  }
  k++;
  pd++;
}
k = 0;
r = 1;
while ( cond1( r, k) ){
  c = k;
  l = r;
  while (cond2( l, c) ) {
    key=l+':'+c;
    val=mp.get( key );
    val.pd = pd;
    mp.set( key, val );
    pd++;
    l++;
    c++;
    // console.log(pd++, l++, c++, val );
  }
  r++;
  pd++;
}

let pu = 0;
r = nl -1;
k = 0;
while ( cond1( r, k) ){
  c = k;
  l = r;
  while (cond2( l, c) ) {
    key=l+':'+c;
    val=mp.get( key );
    val.pu = pu;
    mp.set( key, val );
    pu++;
    l--;
    c++;
    // console.log(pu++, l--, c++, val );
  }
  k++;
  pu++;
}

k = 0;
r--;
while ( cond1( r, k) ){
  c = k;
  l = r;
  while (cond2( l, c) )

  {
    key=l+':'+c;
    val=mp.get( key );
    val.pu = pu;
    mp.set( key, val );
    pu++;
    l--;
    c++;
    // console.log(pu, l, c, val );
  }
  r--;
  pu++;
}


// console.log( mp );

const la = new Array( mp.size + ec  );
la.fill(".", 0 );
const ca = new Array( mp.size + ec  );
ca.fill(".", 0 );
const da = new Array( pd - 1  );
da.fill(".", 0 );
const ua = new Array( pu - 1  );
ua.fill(".", 0 );

// function rangeSet( start, end  ){
//   const st = new Set();
//   for( let i = start; i <= end; i++ ){
//     st.add( i );
//   }
//   return st;
// }
// const li = rangeSet( 0, nl - 1);
// const ci = rangeSet( 0, nc - 1);

function sleep( millis ){
  const endTime =  new Date().getTime() + millis;
  while( new Date().getTime() < endTime){
    console.log( new Date().getTime(), endTime );
  }
}
// console.log( sleep( 1 ) );

let rl;
let rc;

const sheet = document.styleSheets[0];
const rules = sheet.cssRules || sheet.rules;



// const rx = new RegExp("(?<=^(?:.{3})).", "s" );
// let wl = true;
const winR = 'R'.repeat(wl);
const winB = 'B'.repeat(wl);
const regWinR = new RegExp( 'R'.repeat(wl));
const regWinB = new RegExp( 'B'.repeat(wl));
let ct = 0;
let pl = 'R';
let cl = 'rPlayer';
let running = true;
// while( ctr < 100 && running  ){
//   play(ctr);
// }

let interv = setInterval( play(ct), 1000 );


function play(ct) {
  console.log( 'ct:', ct );
  rl = Math.floor( Math.random() * nl )
  rc = Math.floor( Math.random() * nc );
  key=rl+':'+rc;
  val=mp.get(key);
  // console.log(ct++, key, val);
  if ( la[val.pl] !== '.'){
    // console.log( 'already set:', la[val.pl]);
    return;
  }
  document.getElementById(key).classList.add( cl );
  la[val.pl]=pl;
  ca[val.pc]=pl;
  da[val.pd]=pl;
  ua[val.pu]=pl;

  const laR = ca.join('').indexOf(winR);
  console.log( 'laR', laR, 'winR', winR );
  if ( laR !== -1 ){
    const elems = [];
    for( let [k, v] of mp ){
      if ( inRange(v.pc, laR, laR+wl-1) ){
        elems.push(k);
        rules[1].style.opacity=0.3;
        document.getElementById(k).classList.add('winner');
        console.log( '---------', k, v );
      }
    }
    // const winL = mp.filter( (k, v) => inRange(v.pl, v.pl, v.pl+wl-1) );
    console.log('******', elems );
  }


  if ( la.join('').match( regWinR ) || ca.join('').match( regWinR ) || da.join('').match( regWinR )|| ua.join('').match( regWinR )){
    console.log( 'Winner: R');
    running = false;
    return;
  }
  if ( la.join('').match(regWinB) || ca.join('').match(regWinB) || da.join('').match(regWinB)|| ua.join('').match(regWinB)){
    console.log( 'Winner: B');
    running = false;
    return;
  }
  // console.log(ca.join(''));
  pl = pl === 'R'?'B':'R';
  cl = pl === 'R'?'rPlayer':'bPlayer';
  // sleep( 1000 );
  ct++;
  if ( ct >= 100 | !running ){
    clearInterval(interv);
    runFinal();
  }
}

function runFinal() {
  console.log(la.join(''));
  console.log(ca.join(''));
  console.log(da.join(''));
  console.log(ua.join(''));

  console.log(rules);

  // const x = new Array( 10 );
  // const y = x.map( (elem, idx, arr ) => arr[idx] = idx  );

  // la[3]=5;
  // let xy = 0;
  // x.fill( xy++ );
  // console.log( mp );
  console.log(mp.size, ec);
  // console.log( la );
  // console.log( ...la );
  // console.log( x, y );
}
