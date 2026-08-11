
// ── SÉCURITÉ AFFICHAGE ────────────────────────────────────────
// Empêche qu'un texte tapé par un utilisateur (description, nom...)
// contenant des caractères comme < ou > casse l'affichage de la page.
function esc(txt){
  if(txt===null||txt===undefined) return '';
  return String(txt)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

// (note : la journalisation qui/quoi/quand est gérée par logModification()
// définie plus bas, déjà branchée sur les points d'écriture importants)

// ── CONFIG ────────────────────────────────────────────────────

const MEMBRES = [{"isa": 1, "nom": "ACHI Axel", "genre": "Lahy", "mpandray": false}, {"isa": 2, "nom": "ACHI David", "genre": "Lahy", "mpandray": false}, {"isa": 3, "nom": "ACHI Nathanael", "genre": "Lahy", "mpandray": false}, {"isa": 4, "nom": "ACHI Sahoby", "genre": "Vavy", "mpandray": true}, {"isa": 5, "nom": "ANDRIAHERINIAINA Ny Antsa", "genre": "", "mpandray": false}, {"isa": 6, "nom": "ANDRIAMAHATANA Tanjona", "genre": "Lahy", "mpandray": false}, {"isa": 7, "nom": "ANDRIAMAMPAHERY Davida", "genre": "Lahy", "mpandray": true}, {"isa": 8, "nom": "ANDRIAMAMPAHERY Jeremia", "genre": "Lahy", "mpandray": true}, {"isa": 9, "nom": "ANDRIAMANANA Gershom", "genre": "Lahy", "mpandray": false}, {"isa": 10, "nom": "ANDRIAMANANTSOA Holy", "genre": "Vavy", "mpandray": false}, {"isa": 11, "nom": "ANDRIAMANDROSO Alexia", "genre": "Vavy", "mpandray": true}, {"isa": 12, "nom": "ANDRIAMANDROSO Ilona", "genre": "Vavy", "mpandray": false}, {"isa": 13, "nom": "ANDRIAMBAHINY ATHENA", "genre": "Vavy", "mpandray": false}, {"isa": 14, "nom": "ANDRIAMBAHINY ATTILIO", "genre": "Lahy", "mpandray": false}, {"isa": 15, "nom": "ANDRIAMBAHINY AYLA", "genre": "Vavy", "mpandray": false}, {"isa": 16, "nom": "ANDRIAMBAHINY Fetra", "genre": "Vavy", "mpandray": true}, {"isa": 17, "nom": "ANDRIAMBAHINY Patrick", "genre": "Lahy", "mpandray": true}, {"isa": 18, "nom": "ANDRIAMIADANA Mirintsoa", "genre": "Vavy", "mpandray": true}, {"isa": 19, "nom": "ANDRIAMITANA Tina Henri Adya", "genre": "Lahy", "mpandray": false}, {"isa": 20, "nom": "ANDRIANARY RAKOTOARISON Verohaja Nivosoa", "genre": "Vavy", "mpandray": true}, {"isa": 21, "nom": "ANDRIANAVALONA Tsanta", "genre": "Vavy", "mpandray": false}, {"isa": 22, "nom": "ANDRIANTAVY Hary", "genre": "Lahy", "mpandray": true}, {"isa": 23, "nom": "ANDRIANTAVY RAKOTOVOAVY Clémence", "genre": "Vavy", "mpandray": true}, {"isa": 24, "nom": "ANDRIATSIFERANA Irina", "genre": "Vavy", "mpandray": true}, {"isa": 25, "nom": "ANDRIHERINIAINA Ny kanto Irintsoa", "genre": "vavy", "mpandray": false}, {"isa": 26, "nom": "ANDRIHERINIAINA Ony Mahefa", "genre": "Vavy", "mpandray": true}, {"isa": 27, "nom": "ANDRIHERINIAINA Ramanolosoa Omega", "genre": "Lahy", "mpandray": true}, {"isa": 28, "nom": "FANDRESENA Abigail", "genre": "Vavy", "mpandray": true}, {"isa": 29, "nom": "HAJAVOLA Ethaniel", "genre": "Lahy", "mpandray": false}, {"isa": 30, "nom": "HARIVELO Hanta", "genre": "Vavy", "mpandray": true}, {"isa": 31, "nom": "Harivelo Tantely", "genre": "", "mpandray": true}, {"isa": 32, "nom": "KAMDEM  Andry Cheick", "genre": "Lahy", "mpandray": false}, {"isa": 33, "nom": "KAMDEM Serena Mioty", "genre": "Vavy", "mpandray": false}, {"isa": 34, "nom": "MAMPAHERY JORDAN", "genre": "Lahy", "mpandray": true}, {"isa": 35, "nom": "MANAMBITSOA Toavina", "genre": "Lahy", "mpandray": false}, {"isa": 36, "nom": "MANAMBITSOA Tovo", "genre": "Lahy", "mpandray": true}, {"isa": 37, "nom": "MIRADO Solofo Ny Fitiavana", "genre": "Lahy", "mpandray": false}, {"isa": 38, "nom": "NASOLOMALALA MANAMBITSOA Verohanta", "genre": "Vavy", "mpandray": true}, {"isa": 39, "nom": "ONINJATOVO Kamdem Felanarinofy Nina", "genre": "Vavy", "mpandray": true}, {"isa": 40, "nom": "RABARY Mamonjisoanirina", "genre": "Vavy", "mpandray": true}, {"isa": 41, "nom": "RABARY Nandrianina Claudio", "genre": "Lahy", "mpandray": true}, {"isa": 42, "nom": "RABARY Tianaritsimba", "genre": "Lahy", "mpandray": true}, {"isa": 43, "nom": "RABEFANIRAKA Noroarisoa", "genre": "Vavy", "mpandray": true}, {"isa": 44, "nom": "RABEHERIFARA Fiderana", "genre": "Vavy", "mpandray": true}, {"isa": 45, "nom": "RABEHERIFARA Guy", "genre": "Lahy", "mpandray": true}, {"isa": 46, "nom": "RABEHERIFARA Stephane", "genre": "Lahy", "mpandray": false}, {"isa": 47, "nom": "RABENJA Irina", "genre": "Lahy", "mpandray": false}, {"isa": 48, "nom": "RABEONY Sarah Michèle", "genre": "Vavy", "mpandray": true}, {"isa": 49, "nom": "RABETALIANA  Vatosoa", "genre": "Vavy", "mpandray": false}, {"isa": 50, "nom": "RABETALIANA Mahefa", "genre": "Lahy", "mpandray": true}, {"isa": 51, "nom": "RABETALIANA Malalasoa", "genre": "Vavy", "mpandray": true}, {"isa": 52, "nom": "RABETRANO Hantasoanirina  Josette", "genre": "Vavy", "mpandray": true}, {"isa": 53, "nom": "RABETSIMIALONA Ndriana", "genre": "Lahy", "mpandray": true}, {"isa": 54, "nom": "RABOSAONA Aina Herilanto Yvon Staël", "genre": "Lahy", "mpandray": true}, {"isa": 55, "nom": "RABOSAONA Chris", "genre": "Lahy", "mpandray": false}, {"isa": 56, "nom": "RABOSAONA Hansa", "genre": "Lahy", "mpandray": true}, {"isa": 57, "nom": "RABOSAONA Miaro Hanson", "genre": "Lahy", "mpandray": false}, {"isa": 58, "nom": "RABOSAONA Mihaja Hansel", "genre": "", "mpandray": false}, {"isa": 59, "nom": "RABOSAONA Ricardo", "genre": "Lahy", "mpandray": false}, {"isa": 60, "nom": "RABOSAONA Staella", "genre": "Vavy", "mpandray": false}, {"isa": 61, "nom": "RABOSOANA Hasintsoa Rebecca", "genre": "vavy", "mpandray": false}, {"isa": 62, "nom": "RAFANOMEZANTSOA Sahondra", "genre": "Vavy", "mpandray": false}, {"isa": 63, "nom": "RAHARIMALALA Florence", "genre": "Vavy", "mpandray": true}, {"isa": 64, "nom": "RAHARINAIVO Juslain Nomenjanahary", "genre": "Lahy", "mpandray": false}, {"isa": 65, "nom": "RAHARISOA Eliane Christella", "genre": "vavy", "mpandray": false}, {"isa": 66, "nom": "RAHASIVELONJANAHARY  Dina Onintsoa", "genre": "vavy", "mpandray": true}, {"isa": 67, "nom": "RAJAOBELINA Sarah", "genre": "Vavy", "mpandray": true}, {"isa": 68, "nom": "RAJAONAH Mamy", "genre": "Lahy", "mpandray": true}, {"isa": 69, "nom": "RAJAONAH Voahirana", "genre": "Vavy", "mpandray": true}, {"isa": 70, "nom": "RAJAONARIFETRA Andriamahandry Tony M.", "genre": "Lahy", "mpandray": true}, {"isa": 71, "nom": "RAJAONARIFETRA Patricia", "genre": "Vavy", "mpandray": true}, {"isa": 72, "nom": "RAJAONARIFETRA Rivo Mahaleo", "genre": "Lahy", "mpandray": true}, {"isa": 73, "nom": "RAJAONARIFETRA Rotsy Fitahiana Vahiandrianina", "genre": "Vavy", "mpandray": false}, {"isa": 74, "nom": "rakoto", "genre": "Vavy", "mpandray": false}, {"isa": 75, "nom": "RAKOTOARISOA Aina Raphaël", "genre": "Lahy", "mpandray": false}, {"isa": 76, "nom": "RAKOTOARISOA RABENANDRASANA Norohasina Narindra", "genre": "Vavy", "mpandray": true}, {"isa": 77, "nom": "RAKOTOARISOA Toky Lalaina", "genre": "Lahy", "mpandray": true}, {"isa": 78, "nom": "RAKOTOARISON  Blaise Fitahiana", "genre": "Lahy", "mpandray": false}, {"isa": 79, "nom": "RAKOTOARISON ANDRIANARY  Ny Harena", "genre": "Vavy", "mpandray": true}, {"isa": 80, "nom": "RAKOTOARISON ANDRIANARY Chsitelle", "genre": "Vavy", "mpandray": true}, {"isa": 81, "nom": "RAKOTOARISON ANDRIANARY Nantenaina", "genre": "Lahy", "mpandray": true}, {"isa": 82, "nom": "RAKOTOARIVELO Nirina Julien", "genre": "Lahy", "mpandray": true}, {"isa": 83, "nom": "RAKOTOARIVONY  Nasya", "genre": "vavy", "mpandray": false}, {"isa": 84, "nom": "RAKOTOARIVONY Andry Setra", "genre": "Lahy", "mpandray": true}, {"isa": 85, "nom": "RAKOTOARIVONY Evah", "genre": "Vavy", "mpandray": true}, {"isa": 86, "nom": "RAKOTOARIVONY Ny Aina Ando", "genre": "Vavy", "mpandray": true}, {"isa": 87, "nom": "RAKOTOARIVONY Soraya", "genre": "", "mpandray": false}, {"isa": 88, "nom": "RAKOTOMAHEFA Fetra Emilie", "genre": "Vavy", "mpandray": true}, {"isa": 89, "nom": "RAKOTOMAHEFA Lewis", "genre": "Lahy", "mpandray": true}, {"isa": 90, "nom": "RAKOTOMALALA Faniry", "genre": "Vavy", "mpandray": true}, {"isa": 91, "nom": "RAKOTOMALALA Hanitra", "genre": "Vavy", "mpandray": true}, {"isa": 92, "nom": "RAKOTOMANANA Anjara Tolotra", "genre": "Lahy", "mpandray": true}, {"isa": 93, "nom": "RAKOTONDRAINIBE Miaro", "genre": "Lahy", "mpandray": false}, {"isa": 94, "nom": "RAKOTONDRAINIBE Mieja", "genre": "Vavy", "mpandray": false}, {"isa": 95, "nom": "RAKOTONDRAINIBE Mihamintsoa Hasina", "genre": "Lahy", "mpandray": true}, {"isa": 96, "nom": "RAKOTONDRAINIBE Mirajo", "genre": "Lahy", "mpandray": false}, {"isa": 97, "nom": "RAKOTONDRAINIBE Mirija Yanael", "genre": "Lahy", "mpandray": false}, {"isa": 98, "nom": "RAKOTONDRASOA Nambinintsoa", "genre": "Vavy", "mpandray": true}, {"isa": 99, "nom": "RAKOTONDRATOVO Michou Thierry", "genre": "Lahy", "mpandray": true}, {"isa": 100, "nom": "RAKOTONDRATOVO Mihaingo Abigail", "genre": "Vavy", "mpandray": false}, {"isa": 101, "nom": "RAKOTONDRAZAKA Hajavola", "genre": "Lahy", "mpandray": true}, {"isa": 102, "nom": "RAKOTONDRAZAKA RATSIMANOHATRA  Hanitra", "genre": "Vavy", "mpandray": true}, {"isa": 103, "nom": "RAKOTONIAINA", "genre": "Lahy", "mpandray": true}, {"isa": 104, "nom": "RAKOTONIAINA Ando Ny Kanto", "genre": "Vavy", "mpandray": true}, {"isa": 105, "nom": "RAKOTONIAINA RASOAZANANY Géroline", "genre": "Vavy", "mpandray": true}, {"isa": 106, "nom": "RAKOTONIRAINY Jary's  Bryan", "genre": "Lahy", "mpandray": false}, {"isa": 107, "nom": "RAKOTONIRAINY Jennifer J Toavinkaja", "genre": "Vavy", "mpandray": false}, {"isa": 108, "nom": "RAKOTONIRAINY Manovosoa", "genre": "Lahy", "mpandray": true}, {"isa": 109, "nom": "RAKOTONIRAINY Mégane", "genre": "vavy", "mpandray": false}, {"isa": 110, "nom": "RAKOTOSON Nathalie Lolona", "genre": "Vavy", "mpandray": true}, {"isa": 111, "nom": "RAKOTOSON Nathalie Rija", "genre": "Vavy", "mpandray": true}, {"isa": 112, "nom": "RAKOTOSON Rado", "genre": "Lahy", "mpandray": true}, {"isa": 113, "nom": "RAKOTOSON Rija", "genre": "Lahy", "mpandray": true}, {"isa": 114, "nom": "RAMAMBASOA Aina Hery", "genre": "Lahy", "mpandray": true}, {"isa": 115, "nom": "RAMAROMANANA Clara", "genre": "Vavy", "mpandray": true}, {"isa": 116, "nom": "RAMAROMANANA Herizo", "genre": "Lahy", "mpandray": true}, {"isa": 117, "nom": "RAMBOATINA Aina", "genre": "Vavy", "mpandray": true}, {"isa": 118, "nom": "RANARIJAONA Josea", "genre": "Vavy", "mpandray": true}, {"isa": 119, "nom": "RANARIJAONA Marc", "genre": "Lahy", "mpandray": true}, {"isa": 120, "nom": "RANARIJAONA Tefy", "genre": "Lahy", "mpandray": true}, {"isa": 121, "nom": "RANDRIAMANANTSOA Faly", "genre": "Lahy", "mpandray": false}, {"isa": 122, "nom": "RANDRIANAIVO Hariirina", "genre": "Vavy", "mpandray": true}, {"isa": 123, "nom": "RANDRIANAIVO Harilalao", "genre": "Vavy", "mpandray": true}, {"isa": 124, "nom": "RANDRIANAIVO HARIMANANTSOA  Laeticia", "genre": "Vavy", "mpandray": true}, {"isa": 125, "nom": "RANDRIANAIVO Harimboahangy", "genre": "Vavy", "mpandray": true}, {"isa": 126, "nom": "RANDRIANAIVO Kathy", "genre": "Vavy", "mpandray": true}, {"isa": 127, "nom": "RANDRIANAIVO Tovohery Zo", "genre": "Lahy", "mpandray": false}, {"isa": 128, "nom": "RANDRIANAIVONAVALONA RAKOTONIRAINY Michelle", "genre": "vavy", "mpandray": true}, {"isa": 129, "nom": "RANDRIARIMANANA Faramalala", "genre": "Vavy", "mpandray": true}, {"isa": 130, "nom": "RANDRIASY Nomentsoa  Andrianina (Nina)", "genre": "Vavy", "mpandray": true}, {"isa": 131, "nom": "RAPELANORO RABENJA Tiana Pauml", "genre": "Lahy", "mpandray": true}, {"isa": 132, "nom": "RASOANAIVO Faramalala", "genre": "vavy", "mpandray": true}, {"isa": 133, "nom": "RATOARIJAONA Fenitra Ny Aina", "genre": "Lahy", "mpandray": false}, {"isa": 134, "nom": "RATOARIJAONA Ilo Ny Aina", "genre": "Lahy", "mpandray": false}, {"isa": 135, "nom": "RATOARIJAONA Irina", "genre": "Vavy", "mpandray": false}, {"isa": 136, "nom": "RATOARIJAONA Mahery", "genre": "Lahy", "mpandray": true}, {"isa": 137, "nom": "RATOARIJAONA Njato", "genre": "Lahy", "mpandray": true}, {"isa": 138, "nom": "RATOARIJAONA Tahina Andosoa", "genre": "Lahy", "mpandray": true}, {"isa": 139, "nom": "RATOARIJAONA Tsinjo Ny Aina", "genre": "Lahy", "mpandray": false}, {"isa": 140, "nom": "RATOARIJAONA Vololona", "genre": "Vavy", "mpandray": true}, {"isa": 141, "nom": "RATOVO Holy", "genre": "Vavy", "mpandray": true}, {"isa": 142, "nom": "RATOVO Jean Samuel", "genre": "Lahy", "mpandray": true}, {"isa": 143, "nom": "RATOVO Mahera", "genre": "Lahy", "mpandray": true}, {"isa": 144, "nom": "RATOVO RAKOTONDRATSIMA Carole", "genre": "vavy", "mpandray": false}, {"isa": 145, "nom": "RATSIMANDRESY Mirana Nodimbiasina", "genre": "vavy", "mpandray": true}, {"isa": 146, "nom": "RATSIMBAZAFY RATOARIJAONA Hary Ny Aina", "genre": "Vavy", "mpandray": true}, {"isa": 147, "nom": "RAVELOARISOA Safidy", "genre": "", "mpandray": false}, {"isa": 148, "nom": "RAVELOSON Soafaneva Aina", "genre": "Vavy", "mpandray": true}, {"isa": 149, "nom": "RAVELOSON Toky Fanomezana", "genre": "Lahy", "mpandray": true}, {"isa": 150, "nom": "RAZAFIMAHATRA Mamy Rijason", "genre": "Lahy", "mpandray": true}, {"isa": 151, "nom": "RAZAFIMAHATRA Nomenjanahary Mirana", "genre": "Vavy", "mpandray": true}, {"isa": 152, "nom": "RAZAFIMAHATRATRA Tsiky Océane", "genre": "Vavy", "mpandray": false}, {"isa": 153, "nom": "RAZAFIMANDIMBY A. Tsiory", "genre": "Lahy", "mpandray": true}, {"isa": 154, "nom": "RAZAFINDRANASINA Amelia Faneva", "genre": "Vavy", "mpandray": false}, {"isa": 155, "nom": "RAZAFINDRANASINA Manoa Adrien", "genre": "Lahy", "mpandray": false}, {"isa": 156, "nom": "RAZAFINDRANASINA Michelle Irène", "genre": "Vavy", "mpandray": true}, {"isa": 157, "nom": "RAZAFINDRANASINA Paul Lalaniaina", "genre": "Lahy", "mpandray": true}, {"isa": 158, "nom": "RAZAFINDRANASINA Rantoanina", "genre": "Lahy", "mpandray": true}, {"isa": 159, "nom": "RAZAFINDRANASINA Sarah", "genre": "Vavy", "mpandray": true}, {"isa": 160, "nom": "RAZAFINDRANASINA Tahina", "genre": "Lahy", "mpandray": true}, {"isa": 161, "nom": "RAZAKAHARIVONY Sataniaina  Lucia", "genre": "Vavy", "mpandray": true}, {"isa": 162, "nom": "SOLOMANANA Jô", "genre": "Lahy", "mpandray": true}, {"isa": 163, "nom": "SOLOMANANA Mireille", "genre": "Vavy", "mpandray": true}, {"isa": 164, "nom": "SOMANO Cheiche", "genre": "Lahy", "mpandray": true}, {"isa": 165, "nom": "SOMANO Fara", "genre": "Vavy", "mpandray": true}, {"isa": 166, "nom": "SOMANO Nazma", "genre": "Vavy", "mpandray": true}, {"isa": 167, "nom": "SOMANO Patrick", "genre": "Lahy", "mpandray": true}, {"isa": 168, "nom": "TSIKINIAINA Julio Eddye", "genre": "Lahy", "mpandray": true}, {"isa": 169, "nom": "VONINTSOA Heriniaina Fifaliana", "genre": "Vavy", "mpandray": true}, {"isa": 170, "nom": "ZAFINDRAIBE Cédric", "genre": "Lahy", "mpandray": true}, {"isa": 171, "nom": "RAJAOHERITIANA Meja Sandra", "genre": "Vavy", "mpandray": false}];

// ── AUTH ──────────────────────────────────────────────────────



function initAuth(){
  const auth = window._auth;
  if(!auth){ setTimeout(initAuth,200); return; }
  window._onAuth(auth, async function(user){
    if(user){
      currentUser = user;
      // Charger la liste des comptes depuis Firebase (une seule fois, mise en cache)
      await chargerRolesConfig();
      if(!ROLES_CONFIG[user.email]){
        // Compte authentifié par Firebase mais absent de la collection "roles" :
        // on refuse l'accès et on déconnecte proprement, avec un message clair.
        const err=document.getElementById('login-err');
        if(err){ err.style.color='red'; err.textContent='Ce compte existe mais n\'a pas encore de rôle attribué. Contacte l\'administrateur.'; }
        if(window._signOut) window._signOut(auth);
        return;
      }
      const cfg = ROLES_CONFIG[user.email];
      currentRole = cfg.role;
      window._currentRole = cfg.role; // Pour renderLivre et autres
      document.getElementById('login-screen').style.display='none';
      document.getElementById('app').style.display='block';
      document.getElementById('user-bar').style.display='flex';
      document.getElementById('user-avatar').textContent=cfg.nom.charAt(0).toUpperCase();
      document.getElementById('user-nom').textContent=cfg.nom;
      document.getElementById('user-role').textContent=cfg.label;
      // Ajouter classe rôle au body pour CSS ciblé
      document.querySelector('body')?.classList.add('role-'+cfg.role);
      appliquerRole(cfg.role);
    } else {
      currentUser=null; currentRole=null;
      document.getElementById('login-screen').style.display='flex';
      document.getElementById('app').style.display='none';
      document.getElementById('user-bar').style.display='none';
    }
  });
}

function appliquerRole(role){
  const tabGest = document.getElementById('mnav-gest');
  const tabK45  = document.getElementById('mnav-k45');
  const tabGL   = document.getElementById('mnav-gl');
  const tabOps  = document.getElementById('mnav-ops');

  // Cacher tout par défaut
  if(tabOps) tabOps.style.display='none';

  if(role==='diacre_journal'){
    // Nataly — Journal K45 (principal) + Gestion Rakitra (décision réunion)
    if(tabGest) tabGest.style.display='';
    if(tabGL)   tabGL.style.display='none';
    if(tabK45)  tabK45.style.display='';
    showMain('k45', tabK45);
    if(window._db){ chargerTout(); }
    return;
  }

  if(role==='vomieran'){
    // Hary — Anjarako SEULEMENT, pas de Grand Livre
    if(tabGest) tabGest.style.display='';
    if(tabK45)  tabK45.style.display='none';
    if(tabGL)   tabGL.style.display='none';
    if(tabOps)  tabOps.style.display='none';
    showMain('gest', tabGest);
    setTimeout(function(){
      const anjBtn=document.querySelector('#section-gest .nav-btn:nth-child(2)');
      if(anjBtn) showGestTab('anjarako', anjBtn);
    }, 300);
    if(window._db){ chargerAnjarako(); }
    return;
  }

  if(role==='controleur'){
    // Herizo — Grand Livre uniquement
    if(tabGest) tabGest.style.display='none';
    if(tabK45)  tabK45.style.display='none';
    if(tabGL)   tabGL.style.display='';
    showMain('gl', tabGL);
    if(window._db) chargerTout();
    return;
  }

  if(role==='secretaire'||role==='diacre'||role==='tresoriere'){
    // Rija, PL, Ando — tout sauf diacre_journal
    if(tabGest) tabGest.style.display='';
    if(tabK45)  tabK45.style.display='';
    if(tabGL)   tabGL.style.display='';
    if(tabOps)  tabOps.style.display=''; // Opérations visibles
    showMain('gest', tabGest);
    if(window._db){ chargerDepenses(); chargerAnjarako(); chargerTout(); }
    return;
  }

  // Défaut
  showMain('gest', tabGest);
  if(window._db){ chargerDepenses(); chargerAnjarako(); }
}

window.addEventListener('fb-ready', function(){
  initAuth();
  fbOK(); // Initialiser db, fs, _db, _fs pour les modules K45 et Gestion
  // Activer le bouton login
  const loginBtn=document.getElementById('login-btn');
  if(loginBtn){loginBtn.disabled=false;loginBtn.textContent='Se connecter';}
  // Mettre à jour le statut Firebase
  const fbStatus=document.getElementById('fb-status');
  if(fbStatus){fbStatus.style.background='#e8f5ee';fbStatus.style.color='#1a6b3c';}
  const fbDot=document.getElementById('fb-dot');
  if(fbDot) fbDot.style.cssText='width:8px;height:8px;border-radius:50%;background:#1a6b3c;flex-shrink:0;';
  const fbTxt=document.getElementById('fb-txt');
  if(fbTxt) fbTxt.textContent='Firebase connecté ✓';
});

// Désactiver le bouton login jusqu'à Firebase prêt
document.addEventListener('DOMContentLoaded', function(){
  const loginBtn=document.getElementById('login-btn');
  if(loginBtn && !window._fbReady){
    loginBtn.disabled=true;
    loginBtn.textContent='Chargement...';
  }
});

// ── NAVIGATION PRINCIPALE ─────────────────────────────────────
function showMain(section, btn){
  document.querySelectorAll('.main-tab').forEach(b=>b.classList.remove('actif'));
  if(btn) btn.classList.add('actif');
  ['gest','k45','gl','ops'].forEach(s=>{
    const el=document.getElementById('section-'+s);
    if(el) el.style.display=s===section?'':'none';
  });
  if(section==='gl') chargerTout();
}

// ── NAVIGATION SOUS-ONGLETS GESTION ──────────────────────────
function showGestTab(tab, btn){
  document.querySelectorAll('#section-gest .nav-btn').forEach(b=>b.classList.remove('actif'));
  if(btn) btn.classList.add('actif');
  ['rakitra','anjarako','vola','dashboard'].forEach(function(t){
    const el=document.getElementById('tab-'+t);
    if(el) el.style.display=t===tab?'':'none';
  });
  if(tab==='dashboard'){
    dashAnnee=new Date().getFullYear();
    renderDashboard();
    if(window._db){ chargerRakitra().then(renderDashboard); chargerCultes().then(renderDashboard); }
  }
  if(tab==='anjarako'){
    const rakDate=document.getElementById('rak-date-input');
    const anjDate=document.getElementById('anj-date-display');
    if(rakDate&&anjDate) anjDate.value=rakDate.value;
    calculerAnjMoisCourant();afficherEnveloppesJour();
  }
  if(tab==='vola'){afficherDepenses('fiang');afficherDepenses('anj');}
}

// ── NAVIGATION SOUS-ONGLETS JOURNAL K45 ──────────────────────
function showK45Tab(tab, btn){
  document.querySelectorAll('#section-k45 .tab-btn').forEach(function(b){b.classList.remove('actif');});
  if(btn) btn.classList.add('actif');
  ['saisie','historique'].forEach(function(t){
    const el=document.getElementById('k45-tab-'+t);
    if(el) el.style.display=t===tab?'':'none';
  });
  if(tab==='historique') chargerHistorique();
}




// ── JS GESTION ────────────────────────────────────────────────


// ── EXPORT / IMPORT JSON ─────────────────────────────────────
function exporterJSON(){
  const data = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    rakitra:  load(SK_RAKITRA),
    anjarako: load(SK_ANJ_H),
    membres:  load(SK_ANJ_M),
    depenses: load(SK_DEP),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().slice(0,10);
  a.href     = url;
  a.download = 'fkma_donnees_' + date + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importerJSON(){
  document.getElementById('json-import-inp').click();
}

function lireJSON(inp){
  const file = inp.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      let msg = '📦 Fichier du ' + (data.exportedAt||'?').slice(0,10) + '\n\nDonnées trouvées :\n';
      if(data.rakitra)  msg += '  🙏 Rakitra  : ' + data.rakitra.length  + ' entrée(s)\n';
      if(data.anjarako) msg += '  📨 Anjarako : ' + data.anjarako.length + ' entrée(s)\n';
      if(data.membres)  msg += '  👥 Membres  : ' + data.membres.length  + ' entrée(s)\n';
      if(data.depenses) msg += '  💸 Dépenses : ' + data.depenses.length + ' entrée(s)\n';
      msg += NL+'⚠️ Importer va FUSIONNER avec les données existantes (pas d' + "'" + 'écrasement).'+NL+'Continuer ?';
      if(!confirm(msg)) return;
      // Fusionner sans doublons (clé = date)
      function fusionner(sk, nouv, cle){
        if(!nouv||!nouv.length) return;
        const exist = load(sk);
        nouv.forEach(n => {
          const idx = exist.findIndex(e => e[cle] === n[cle]);
          if(idx < 0) exist.push(n);
        });
        exist.sort((a,b) => (b[cle]||'').localeCompare(a[cle]||''));
        save(sk, exist);
      }
      fusionner(SK_RAKITRA, data.rakitra,  'date');
      fusionner(SK_ANJ_H,   data.anjarako, 'date');
      fusionner(SK_DEP,     data.depenses, 'id');
      if(data.membres && data.membres.length){
        const em = load(SK_ANJ_M);
        data.membres.forEach(m => { if(!em.find(e=>e.num===m.num)) em.push(m); });
        save(SK_ANJ_M, em);
      }
      alert('✅ Importation terminée !\nRechargez la page pour voir les données mises à jour.');
      inp.value = '';
    } catch(err) {
      alert('❌ Fichier JSON invalide : ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ── AUTHENTIFICATION FIREBASE ─────────────────────────────────

async function seConnecter(){
  const email = document.getElementById('login-email').value.trim();
  const pwd   = document.getElementById('login-pwd').value;
  const err   = document.getElementById('login-err');
  const btn   = document.getElementById('login-btn');

  err.textContent = '';
  if(!email || !pwd){
    err.style.color='red'; err.textContent='Remplir email et mot de passe.'; return;
  }
  // Note : on ne peut pas vérifier ROLES_CONFIG ici — cette liste vient de Firebase
  // et ne peut être lue qu'une fois connecté (sécurité). La vérification du droit
  // d'accès se fait juste après la connexion réussie, plus bas.

  // Attendre Firebase si pas encore prêt (max 15 secondes)
  if(!window._auth || !window._signIn){
    btn.disabled=true; btn.textContent='Chargement...';
    let attente=0;
    while((!window._auth || !window._signIn) && attente < 300){
      await new Promise(r=>setTimeout(r,100));
      attente++;
    }
    if(!window._auth || !window._signIn){
      err.style.color='orange';
      err.textContent='Firebase lent — réessayez dans quelques secondes.';
      btn.disabled=false; btn.textContent='Se connecter';
      return;
    }
  }

  btn.disabled=true; btn.textContent='Connexion...';
  err.style.color='orange'; err.textContent='Vérification...';

  // Réessayer jusqu'à 3 fois en cas d'erreur réseau temporaire
  let tentative=0;
  while(tentative < 3){
    try{
      await window._signIn(window._auth, email, pwd);
      return; // Succès
    } catch(e){
      tentative++;
      if(e.code==='auth/wrong-password'||e.code==='auth/invalid-credential'){
        err.style.color='red'; err.textContent='Mot de passe incorrect.';
        btn.disabled=false; btn.textContent='Se connecter';
        return;
      } else if(e.code==='auth/user-not-found'){
        err.style.color='red'; err.textContent='Email introuvable.';
        btn.disabled=false; btn.textContent='Se connecter';
        return;
      } else if(e.code==='auth/network-request-failed' && tentative < 3){
        err.style.color='orange'; err.textContent='Tentative '+tentative+'/3...';
        await new Promise(r=>setTimeout(r,2000)); // Attendre 2s avant de réessayer
      } else {
        err.style.color='red';
        err.textContent=e.code==='auth/network-request-failed'
          ? 'Connexion Firebase échouée — vérifier internet puis réessayer.'
          : 'Erreur : '+e.message;
        btn.disabled=false; btn.textContent='Se connecter';
        return;
      }
    }
  }
}

async function seDeconnecter(){
  if(!confirm('Se déconnecter ?')) return;
  if(window._signOut && window._auth) await window._signOut(window._auth);
}

// Appeler initAuth au chargement


function onLoginSuccess(role){
  // diacre_journal n'a pas accès à la Gestion → rediriger vers Journal
  if(role==='diacre_journal'){
    alert('Votre accès est limité au Journal K45.');
    showMain('k45',document.getElementById('mnav-k45'));
    return;
  }
  console.log('Connecté avec rôle:', role);
  if(window._db){chargerDepenses();chargerAnjarako();}
}

// ── DONNÉES ──────────────────────────────────────────────────
const BILLETS = [{"v": 10000, "color": "#e67e22"}, {"v": 5000, "color": "#8e44ad"}, {"v": 2000, "color": "#2980b9"}, {"v": 1000, "color": "#27ae60"}, {"v": 500, "color": "#c0392b"}];
const PIECES  = [{"v": 500, "color": "#f39c12"}, {"v": 200, "color": "#7f8c8d"}, {"v": 100, "color": "#95a5a6"}, {"v": 50, "color": "#bdc3c7"}, {"v": 25, "color": "#aaa"}, {"v": 10, "color": "#ccc"}, {"v": 5, "color": "#ddd"}];
const DIACRES_CONNUS = ["Ando", "Mahery", "Njato", "Lolona", "Mano", "Yvon Staël", "Pasitera", "Ramatoa", "Rivo", "Patricia", "Nivo", "Leiticia", "Ony", "Rija", "Nathalie"];
const FAITS_TYPES    = [{"id": "fiarahabana", "label": "Fiarahabana izay vao tonga (accueil nouveaux membres)"}, {"id": "beloma", "label": "Fanaovam-beloma (au revoir / départ)"}, {"id": "fanoloran", "label": "Fanoloran-jaza (présentation enfant)"}, {"id": "batisa", "label": "Batisa (baptême)"}, {"id": "fanambadiana", "label": "Fanambadiana (mariage)"}, {"id": "fanokanana", "label": "Fanokanana (consécration)"}, {"id": "hetsika", "label": "Hetsika manokana (événement spécial)"}, {"id": "autre", "label": "Autre (texte libre)"}];
const MOIS_FR        = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// ── STOCKAGE ─────────────────────────────────────────────────
function load(k){try{return JSON.parse(localStorage.getItem(k)||'[]');}catch{return[];}}
function save(k,d){localStorage.setItem(k,JSON.stringify(d));}
function fmt(n){return Number(n||0).toLocaleString('fr-FR');}
function moisLabel(ym){if(!ym)return'—';const p=ym.split('-');return MOIS_FR[parseInt(p[1])-1]+' '+p[0];}

const SK_CULTES  = 'fkma_cultes';
const SK_RAKITRA = 'fkma_rakitra';
const SK_ANJ_H   = 'fkma_anj_hist';
const SK_ANJ_M   = 'fkma_anj_membres';
const SK_DEP     = 'fkma_depenses';

// ── FIREBASE ──────────────────────────────────────────────────
let _db = null, _fs = null;
function fbOK(){
  _db = window._db; _fs = window._fs;
  db = window._db; fs = window._fs; // Pour le module Journal K45
  document.getElementById('fb-status').style.background='#e8f5ee';
  document.getElementById('fb-status').style.color='#1a6b3c';
  document.getElementById('fb-dot').style.background='#1a6b3c';
  document.getElementById('fb-dot').style.animation='none';
  document.getElementById('fb-txt').textContent='Firebase connecté ✓';
  // Charger les données depuis Firebase au démarrage
  chargerDepenses();
  chargerAnjarako();
}
function fbErr(msg){
  document.getElementById('fb-status').style.background='#fdecea';
  document.getElementById('fb-status').style.color='#c0392b';
  document.getElementById('fb-dot').style.background='#c0392b';
  document.getElementById('fb-dot').style.animation='none';
  document.getElementById('fb-txt').textContent='Firebase hors ligne — mode local';
}
// Synchroniser immédiatement si Firebase déjà disponible
if(window._db){ _db=window._db; _fs=window._fs; db=window._db; fs=window._fs; }
if(window._fbReady){ fbOK(); }

function showVolaTab(tab){
  ['fiang','anj'].forEach(t=>{
    document.getElementById('vola-'+t).style.display=t===tab?'':'none';
    document.getElementById('vola-btn-'+t).classList.toggle('actif',t===tab);
  });
}

function showDtab(tab,btn){
  document.querySelectorAll('.dtab').forEach(b=>b.classList.remove('actif'));
  btn.classList.add('actif');
  ['finances','presences','cultes','historique'].forEach(t=>{
    document.getElementById('dtab-'+t).style.display=t===tab?'':'none';
  });
  if(tab==='finances')  renderDashFinances();
  if(tab==='presences') renderDashPresences();
  if(tab==='cultes')    renderDashCultes();
  if(tab==='historique')peuplerHistSelect();
}

function syncDateLabel(){}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('rak-date-input') && (document.getElementById('rak-date-input').valueAsDate=new Date());
  document.getElementById('anj-date-display') && (document.getElementById('anj-date-display').valueAsDate=new Date());
  document.getElementById('tres-date').valueAsDate=new Date();
  document.getElementById('vf-date').valueAsDate=new Date();
  document.getElementById('va-date').valueAsDate=new Date();
  document.getElementById('env-mois').value=moisActuel();
  buildTableaux();
  ajouterDiacre(); ajouterDiacre();
  buildAnjBillets();
  syncDateLabel();
  afficherDepenses('fiang');
  afficherDepenses('anj');
});

// ── FIAINAM-PIANGONANA ────────────────────────────────────────
function toggleFiainamFandraisana(){
  const on=document.getElementById('f-toggle-fandraisana').checked;
  const z=document.getElementById('f-zone-presences');
  if(on){
    z.innerHTML=`<div class="grid2">
      <div class="champ"><label>🍞 Isan'olona (total présents)</label>
        <input type="number" id="f-presences" min="0" placeholder="0" inputmode="numeric"></div>
      <div class="champ"><label>🍷 Mpandray (parmi eux)</label>
        <input type="number" id="f-mpandray" min="0" placeholder="0" inputmode="numeric"></div>
    </div>`;
  } else {
    z.innerHTML=`<div class="champ"><label>👤 Isan'olona (total présents)</label>
      <input type="number" id="f-presences" min="0" placeholder="0" inputmode="numeric"></div>`;
  }
  const rp=document.getElementById('toggle-raki-pandraisana');
  if(on&&rp&&!rp.checked){rp.checked=true;toggleRakiPandraisana();}
}

let nFaits=0;
// (l'ancienne version de ajouterFait() qui était ici a été supprimée le 07/08/2026 —
// elle était écrasée par la version plus bas et créait une incohérence avec snapFaits())

function snapFaits(){
  const faits=[];
  document.querySelectorAll('.fc').forEach(div=>{
    const base=div.id.replace('fait-','');
    const sel=document.getElementById(base+'-type');
    if(!sel) return;
    faits.push({
      type:sel.value,
      label:FAITS_TYPES.find(f=>f.id===sel.value)?.label||sel.value,
      noms:document.getElementById(base+'-noms')?.value||'',
      note:document.getElementById(base+'-note')?.value||''
    });
  });
  return faits;
}

function snapCulte(){
  return{
    date:document.getElementById('rak-date-input')?.value||'',
    type:document.getElementById('f-type').value,
    lieu:document.getElementById('f-lieu').value,
    presences:parseInt(document.getElementById('f-presences')?.value)||0,
    mpandray:parseInt(document.getElementById('f-mpandray')?.value)||0,
    isFandraisana:document.getElementById('f-toggle-fandraisana').checked,
    mpitarika:document.getElementById('f-mpitarika').value,
    mitory:document.getElementById('f-mitory').value,
    vavaka:document.getElementById('f-vavaka').value,
    mpamaky:document.getElementById('f-mpamaky').value,
    theme:document.getElementById('f-theme').value,
    faits:snapFaits(),
  };
}

function enregistrerCulte(){
  const d=snapCulte();
  if(!d.date){alert('Veuillez renseigner la date.');return;}
  const hist=load(SK_CULTES);
  const idx=hist.findIndex(h=>h.date===d.date&&h.type===d.type);
  if(idx>=0){if(!confirm('Remplacer ?'))return;hist[idx]=d;}else hist.push(d);
  hist.sort((a,b)=>b.date.localeCompare(a.date));
  save(SK_CULTES,hist);
  alert('✅ Culte du '+d.date+' enregistré !');
}

// ── RAKITRA ──────────────────────────────────────────────────
function buildTableaux(){
  [['billets','b',BILLETS],['pieces','p',PIECES],
   ['billets-rp','rpb',BILLETS],['pieces-rp','rpp',PIECES]].forEach(([id,pref,liste])=>{
    const tbody=document.getElementById('tbody-'+id);
    liste.forEach(item=>{
      const eid=`${pref}_${item.v}`;
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td><div class="badge-coupure">
          <div class="dot" style="background:${item.color}"></div>
          <strong>${item.v.toLocaleString('fr-FR')} FCFA</strong>
        </div></td>
        <td><input class="qty-input" type="number" id="${eid}" min="0" inputmode="numeric" oninput="calculerRakitra()"></td>
        <td id="st_${eid}">—</td>`;
      tbody.appendChild(tr);
    });
  });
}

function toggleRakiPandraisana(){
  const on=document.getElementById('toggle-raki-pandraisana').checked;
  document.getElementById('zone-raki-pandraisana').style.display=on?'':'none';
  document.getElementById('col-rp').style.display=on?'':'none';
  if(!on){
    [...BILLETS,...PIECES.map(p=>({v:p.v}))].forEach(()=>{});
    BILLETS.forEach(b=>{const e=document.getElementById(`rpb_${b.v}`);if(e)e.value='';});
    PIECES.forEach(p=>{const e=document.getElementById(`rpp_${p.v}`);if(e)e.value='';});
  }
  calculerRakitra();
}

let nRaki=0;
// Garde une copie des dernières données Rakitra enregistrées, pour que le
// message WhatsApp reste correct même après la réinitialisation du formulaire.
let dernierRakitraEnregistre=null;
const DEST_DEFAUT = ['Fiangonana','Pasitera','SA','SV','SVM','AM','STS','Autre'];

function ajouterRaki(){
  nRaki++;const id=`raki_${nRaki}`;
  const div=document.createElement('div');div.className='raki-item';div.id=id;
  div.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <span style="font-size:12px;font-weight:600;color:var(--violet)">🎁 Offrande ${nRaki}</span>
      <button onclick="document.getElementById('${id}').remove();calculerRaki()"
        style="background:none;border:none;color:var(--rouge);cursor:pointer;font-size:18px">✕</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:10px">
      <div class="champ">
        <label>💰 Montant total (FCFA)</label>
        <input type="number" id="${id}_m" min="0" placeholder="0" inputmode="numeric"
          oninput="calculerRaki();calculerRepartition('${id}')">
      </div>
      <div class="champ">
        <label>📖 Verset (optionnel)</label>
        <input type="text" id="${id}_v" placeholder="Ex: Malachie 3:10">
      </div>
    </div>
    <div style="font-size:10px;font-weight:600;color:var(--texte2);text-transform:uppercase;
      letter-spacing:.4px;margin-bottom:6px">📊 Répartition par destination</div>
    <div id="${id}_lignes" style="display:flex;flex-direction:column;gap:5px"></div>
    <button onclick="ajouterLigneDest('${id}')"
      style="width:100%;margin-top:6px;padding:7px;background:var(--gris1);
        border:1.5px dashed #c39bd3;border-radius:7px;color:var(--violet);
        font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;
        display:flex;align-items:center;justify-content:center;gap:5px">
      ➕ Ajouter une destination
    </button>
    <div id="${id}_recap" style="display:none;margin-top:8px;background:#f5eef8;
      border-radius:8px;padding:8px 12px">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--violet);margin-bottom:4px">
        <span>Total réparti</span><span id="${id}_repasum">0 F</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px">
        <span style="color:var(--texte2)">Reste non affecté</span>
        <span id="${id}_reste" style="font-weight:600;color:var(--orange)">0 F</span>
      </div>
    </div>`;
  document.getElementById('raki-liste').appendChild(div);
  ajouterLigneDest(id); // Ajouter une première ligne par défaut
  calculerRaki();
}

let nLigne = 0;
function ajouterLigneDest(rakiId){
  nLigne++;
  const lid = `${rakiId}_l${nLigne}`;
  const opts = DEST_DEFAUT.map(d=>`<option value="${d}">${d}</option>`).join('');
  const row = document.createElement('div');
  row.className = 'dest-row'; row.id = lid;
  row.innerHTML=`
    <div style="display:flex;gap:6px;align-items:center">
      <select id="${lid}_dest"
        style="flex:1;border:1.5px solid var(--gris2);border-radius:6px;
          padding:7px 8px;font-size:13px;font-family:inherit;background:white"
        onchange="onDestChange('${lid}')">
        ${opts}
      </select>
      <input type="text" id="${lid}_autre" placeholder="Préciser…"
        style="display:none;flex:1;border:1.5px solid var(--gris2);border-radius:6px;
          padding:7px 8px;font-size:13px;font-family:inherit">
    </div>
    <div style="display:flex;gap:5px;align-items:center">
      <input type="number" id="${lid}_m" min="0" placeholder="0" inputmode="numeric"
        style="width:105px;border:1.5px solid var(--gris2);border-radius:6px;
          padding:7px 8px;font-size:13px;font-family:inherit;text-align:right"
        oninput="calculerRepartition('${rakiId}')">
      <button onclick="document.getElementById('${lid}').remove();calculerRepartition('${rakiId}')"
        style="background:none;border:none;color:var(--rouge);cursor:pointer;
          font-size:16px;padding:0 3px;flex-shrink:0">✕</button>
    </div>`;
  document.getElementById(`${rakiId}_lignes`).appendChild(row);
}

function onDestChange(lid){
  const sel = document.getElementById(`${lid}_dest`);
  const autre = document.getElementById(`${lid}_autre`);
  if(sel.value === 'Autre'){
    autre.style.display = 'block';
    autre.focus();
  } else {
    autre.style.display = 'none';
    autre.value = '';
  }
}

function calculerRepartition(rakiId){
  const total = parseInt(document.getElementById(`${rakiId}_m`)?.value)||0;
  let repaSum = 0;
  document.querySelectorAll(`[id^="${rakiId}_l"][id$="_m"]`).forEach(inp=>{
    repaSum += parseInt(inp.value)||0;
  });
  const reste = total - repaSum;
  const recap = document.getElementById(`${rakiId}_recap`);
  if(repaSum > 0 || total > 0){
    recap.style.display = 'block';
    document.getElementById(`${rakiId}_repasum`).textContent = fmt(repaSum)+' F';
    const resteEl = document.getElementById(`${rakiId}_reste`);
    resteEl.textContent = fmt(Math.abs(reste))+' F'+(reste<0?' ⚠️ dépassement':'');
    resteEl.style.color = reste<0?'var(--rouge)':reste===0?'var(--vert)':'var(--orange)';
  } else {
    recap.style.display = 'none';
  }
  calculerRaki();
}

// ── FORMATAGE EN DIRECT DES MONTANTS (séparateurs de milliers) ──
// Affiche "150 000" pendant la saisie au lieu de "150000". La valeur réelle
// (sans espaces) est retrouvée avec valeurMontant() au moment de lire le champ.
function formaterMontant(input){
  const pos=input.selectionStart;
  const avant=input.value.length;
  const chiffres=input.value.replace(/[^0-9]/g,'');
  input.value=chiffres?Number(chiffres).toLocaleString('fr-FR'):'';
  const diff=input.value.length-avant;
  const nouvellePos=Math.max(0,(pos||0)+diff);
  try{input.setSelectionRange(nouvellePos,nouvellePos);}catch(e){}
}
function valeurMontant(id){
  const el=document.getElementById(id);
  if(!el) return 0;
  return parseInt((el.value||'').replace(/[^0-9]/g,''))||0;
}

function onChangementDateRakitra(){
  const rakDate=document.getElementById('rak-date-input');
  const anjDate=document.getElementById('anj-date-display');
  if(anjDate) anjDate.value=rakDate.value;
  const dejaRempli=[...document.querySelectorAll('#tbody-billets .qty-input, #tbody-pieces .qty-input')].some(el=>el.value);
  if(dejaRempli){
    if(confirm('Changer de date va vider la billeterie et les autres champs déjà remplis (page, offrandes…), pour ne pas mélanger avec le jour précédent. Continuer ?')){
      reinitialiserFormulaireRakitra();
    }
  }
}

// ── RÉINITIALISATION DU FORMULAIRE RAKITRA ───────────────────
// Vide la billeterie et les champs de saisie (page, lettrage, observations,
// offrandes, raki-pandraisana) — appelée après un enregistrement réussi ou
// quand on change la date, pour éviter de mélanger les chiffres d'un jour
// avec ceux du jour suivant.
function reinitialiserFormulaireRakitra(){
  document.querySelectorAll('#tbody-billets .qty-input, #tbody-pieces .qty-input, #tbody-billets-rp .qty-input, #tbody-pieces-rp .qty-input')
    .forEach(function(el){el.value='';});
  const page=document.getElementById('rak-page'); if(page) page.value='';
  const lettrage=document.getElementById('rak-lettrage'); if(lettrage) lettrage.value='';
  const obs=document.getElementById('observations'); if(obs) obs.value='';
  // Offrandes (raki)
  document.getElementById('raki-liste').innerHTML='';
  nRaki=0;
  // Raki-pandraisana : décocher et vider
  const toggleRP=document.getElementById('toggle-raki-pandraisana');
  if(toggleRP){ toggleRP.checked=false; toggleRakiPandraisana(); }
  // Diacres : remettre 2 champs vides comme au démarrage
  document.getElementById('diacres-grille').innerHTML='';
  nd=0; ajouterDiacre(); ajouterDiacre();
  calculerRaki();
  calculerRakitra();
}

function calculerRaki(){
  let tot=0;
  // Ne compter que les montants totaux des offrandesraki (raki_N_m)
  // et ignorer les lignes de répartition (raki_N_lX_m)
  document.querySelectorAll('#raki-liste .raki-item').forEach(function(item){
    const mEl=document.getElementById(item.id+'_m');
    if(mEl) tot+=parseInt(mEl.value)||0;
  });
  document.getElementById('raki-total-val').textContent=fmt(tot)+' FCFA';
  const hasRaki=document.querySelectorAll('#raki-liste .raki-item').length>0;
  document.getElementById('raki-total-row').style.display=hasRaki?'flex':'none';
  return tot;
}

function calculerRakitra(){
  let tb=0,tp=0;
  BILLETS.forEach(b=>{const q=parseInt(document.getElementById(`b_${b.v}`)?.value)||0;const s=q*b.v;tb+=s;const el=document.getElementById(`st_b_${b.v}`);if(el)el.textContent=s>0?fmt(s)+' F':'—';});
  PIECES.forEach(p=>{const q=parseInt(document.getElementById(`p_${p.v}`)?.value)||0;const s=q*p.v;tp+=s;const el=document.getElementById(`st_p_${p.v}`);if(el)el.textContent=s>0?fmt(s)+' F':'—';});
  document.getElementById('tfoot-billets').textContent=fmt(tb)+' FCFA';
  document.getElementById('tfoot-pieces').textContent=fmt(tp)+' FCFA';
  const rpOn=document.getElementById('toggle-raki-pandraisana').checked;
  let rpb=0,rpp=0;
  if(rpOn){
    BILLETS.forEach(b=>{const q=parseInt(document.getElementById(`rpb_${b.v}`)?.value)||0;const s=q*b.v;rpb+=s;const el=document.getElementById(`st_rpb_${b.v}`);if(el)el.textContent=s>0?fmt(s)+' F':'—';});
    PIECES.forEach(p=>{const q=parseInt(document.getElementById(`rpp_${p.v}`)?.value)||0;const s=q*p.v;rpp+=s;const el=document.getElementById(`st_rpp_${p.v}`);if(el)el.textContent=s>0?fmt(s)+' F':'—';});
    document.getElementById('tfoot-billets-rp').textContent=fmt(rpb)+' FCFA';
    document.getElementById('tfoot-pieces-rp').textContent=fmt(rpp)+' FCFA';
  }
  const tot=(tb+tp)+(rpb+rpp);
  document.getElementById('total-rakitra-affichage').innerHTML=`${fmt(tot)} <span>FCFA</span>`;
  document.getElementById('sb-rakitra').textContent=fmt(tb+tp)+' F';
  document.getElementById('sb-rp').textContent=fmt(rpb+rpp)+' F';
}

function snapRakitra(){
  let tb=0,tp=0,rpb=0,rpp=0;
  const lb=BILLETS.map(b=>{const q=parseInt(document.getElementById(`b_${b.v}`)?.value)||0;const s=q*b.v;tb+=s;return{v:b.v,q,s};});
  const lp=PIECES.map(p=>{const q=parseInt(document.getElementById(`p_${p.v}`)?.value)||0;const s=q*p.v;tp+=s;return{v:p.v,q,s};});
  const rpOn=document.getElementById('toggle-raki-pandraisana').checked;
  const lrpb=BILLETS.map(b=>{const q=rpOn?(parseInt(document.getElementById(`rpb_${b.v}`)?.value)||0):0;const s=q*b.v;rpb+=s;return{v:b.v,q,s};});
  const lrpp=PIECES.map(p=>{const q=rpOn?(parseInt(document.getElementById(`rpp_${p.v}`)?.value)||0):0;const s=q*p.v;rpp+=s;return{v:p.v,q,s};});
  const rakis=[];
  // Collecter les offrandesraki (champs _m directs, pas les lignes de répartition)
  document.querySelectorAll('#raki-liste .raki-item').forEach(item=>{
    const rakiId = item.id;
    const mEl = document.getElementById(rakiId+'_m');
    const vEl = document.getElementById(rakiId+'_v');
    const m = parseInt(mEl?.value)||0;
    const v = vEl?.value||'';
    const repartition=[];
    item.querySelectorAll('[id$="_m"]').forEach(inp=>{
      // Exclure le montant total (rakiId_m) — ne prendre que les lignes
      if(inp.id === rakiId+'_m') return;
      const lid = inp.id.replace('_m','');
      const selEl = document.getElementById(lid+'_dest');
      if(!selEl) return;
      const mnt = parseInt(inp.value)||0;
      let dest = selEl.value;
      if(dest==='Autre'){
        const autreEl = document.getElementById(lid+'_autre');
        dest = autreEl?.value||'Autre';
      }
      if(mnt>0||dest) repartition.push({dest,montant:mnt});
    });
    if(m>0) rakis.push({montant:m,verset:v,repartition});
  });
  const totalRaki=rakis.reduce((a,r)=>a+r.montant,0);
  const diacres=[];
  document.querySelectorAll('[id^="diac_"]').forEach(i=>{if(i.value.trim())diacres.push(i.value.trim());});
  return{
    date:document.getElementById('rak-date-input')?.value||'',lb,lp,tb,tp,totalRakitra:tb+tp,
    rpOn,lrpb,lrpp,rpb,rpp,totalRP:rpb+rpp,total:tb+tp+rpb+rpp,
    rakis,totalRaki,diacres,
    page:document.getElementById('rak-page')?.value||'',
    lettrage:document.getElementById('rak-lettrage')?.value.toUpperCase()||'',
    tresNom:document.getElementById('tres-nom').value,
    tresDate:document.getElementById('tres-date').value,
    tresObs:document.getElementById('tres-obs').value,
    obs:document.getElementById('observations').value,
  };
}

// ── HISTORIQUE DES MODIFICATIONS ──────────────────────────────
// Enregistre qui a fait quoi, avec la date et l'heure, dans la collection
// 'journal_modifications'. Ne bloque jamais l'action principale si ça échoue.
async function logModification(action, cible, details){
  try{
    if(!_db&&window._db){_db=window._db;_fs=window._fs;}
    const db=window._db, fs=window._fs;
    if(!db) return;
    const email=window._auth&&window._auth.currentUser?window._auth.currentUser.email:'';
    const nom=ROLES_CONFIG[email]?.nom||email||'Inconnu';
    await fs.addDoc(fs.collection(db,'journal_modifications'),{
      action, cible, details:details||'',
      utilisateurEmail:email, utilisateurNom:nom,
      date:new Date().toISOString()
    });
  }catch(e){ console.log('logModification:',e.message); }
}

// ── NUMÉROTATION SÉQUENTIELLE DES ÉCRITURES ─────────────────────
// Attribue un numéro unique et croissant (n°1, n°2, n°3...) à chaque
// nouvel enregistrement, par type. Utilise une transaction Firebase pour
// garantir qu'aucun numéro n'est donné deux fois, même si deux personnes
// enregistrent exactement en même temps sur deux appareils différents.
async function reserverNumeros(type, n){
  try{
    if(!_db&&window._db){_db=window._db;_fs=window._fs;}
    if(!_db) return Array(n).fill(null);
    const ref=_fs.doc(_db,'compteurs',type);
    const debut=await _fs.runTransaction(_db, async function(tx){
      const snap=await tx.get(ref);
      const actuel=snap.exists()?(snap.data().valeur||0):0;
      tx.set(ref,{valeur:actuel+n},{merge:true});
      return actuel;
    });
    const numeros=[];
    for(let i=1;i<=n;i++) numeros.push(debut+i);
    return numeros;
  }catch(e){
    console.log('Numérotation ('+type+'):',e.message);
    return Array(n).fill(null);
  }
}
async function prochainNumero(type){
  const nums=await reserverNumeros(type,1);
  return nums[0];
}

// ── AFFICHAGE HISTORIQUE DES MODIFICATIONS ─────────────────────
async function chargerHistoriqueModifs(){
  const zone=document.getElementById('historique-modifs-liste');
  if(!zone) return;
  zone.innerHTML='<div style="text-align:center;color:var(--texte2);padding:10px;font-size:13px">Chargement…</div>';
  try{
    if(!_db&&window._db){_db=window._db;_fs=window._fs;}
    if(!_db){ zone.innerHTML='<div style="color:var(--rouge);font-size:13px">Firebase non connecté.</div>'; return; }
    const snap=await _fs.getDocs(_fs.query(_fs.collection(_db,'journal_modifications'), _fs.orderBy('date','desc')));
    if(snap.empty){ zone.innerHTML='<div style="text-align:center;color:var(--texte2);padding:10px;font-size:13px">Aucune modification enregistrée pour l\'instant</div>'; return; }
    const ICONES={creation:'🟢',modification:'🟠',suppression:'🔴'};
    let n=0, html='';
    snap.forEach(docSnap=>{
      if(n>=100) return; // on affiche les 100 plus récentes seulement
      n++;
      const d=docSnap.data();
      const dt=new Date(d.date);
      const dateStr=isNaN(dt)?d.date:dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'})+' à '+dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
      html+=`<div style="border-bottom:1px solid var(--gris1);padding:8px 0;font-size:12px">
        <div style="display:flex;justify-content:space-between;gap:8px">
          <span>${ICONES[d.action]||'⚪'} <strong>${esc(d.cible||'')}</strong></span>
          <span style="color:var(--texte2);white-space:nowrap">${esc(dateStr)}</span>
        </div>
        <div style="color:var(--texte2);margin-top:2px">${esc(d.details||'')}</div>
        <div style="color:var(--texte2);font-style:italic;margin-top:1px">par ${esc(d.utilisateurNom||d.utilisateurEmail||'Inconnu')}</div>
      </div>`;
    });
    zone.innerHTML=html;
  }catch(e){
    zone.innerHTML='<div style="color:var(--rouge);font-size:13px">Erreur : '+esc(e.message)+'</div>';
  }
}


async function enregistrerRakitra(){
  const d=snapRakitra();
  if(!d.date){alert('Veuillez renseigner la date.');return;}
  dernierRakitraEnregistre=d;
  // Piste d'audit
  const _uEmail=window._auth&&window._auth.currentUser?window._auth.currentUser.email:'';
  const _uNom=ROLES_CONFIG[_uEmail]?.nom||_uEmail;
  d.createdBy=_uEmail; d.createdByNom=_uNom; d.createdAt=new Date().toISOString();
  const hist=load(SK_RAKITRA);
  const idx=hist.findIndex(h=>h.date===d.date);
  if(idx>=0){if(!confirm('Remplacer ?'))return;hist[idx]=d;}else hist.push(d);
  hist.sort((a,b)=>b.date.localeCompare(a.date));save(SK_RAKITRA,hist);
  if(!_db&&window._db){_db=window._db;_fs=window._fs;}
  if(_db){try{
    // Sauvegarder dans collection rakitra
    const col=_fs.collection(_db,'rakitra');
    const snap=await _fs.getDocs(col);let xId=null,ancienNumero=null;
    snap.forEach(function(ds){if(ds.data().date===d.date){xId=ds.id;ancienNumero=ds.data().numero;}});
    if(xId){ d.numero=ancienNumero; await _fs.updateDoc(_fs.doc(_db,'rakitra',xId),d); }
    else { d.numero=await prochainNumero('rakitra'); await _fs.addDoc(col,d); }
    // Écriture automatique dans le Grand Livre Fiangonana
    await ecrireGrandLivreFiang(d);
    await ecrireRakiPandraisana45(d);
    logModification('creation','Rakitra n°'+(d.numero||'?')+' du '+d.date, fmt(d.totalRakitra||0)+' F');
    alert('✅ Rakitra n°'+(d.numero||'?')+' du '+d.date+' enregistré !');
    reinitialiserFormulaireRakitra();
  }catch(e){alert('⚠️ ATTENTION : enregistré sur cet appareil seulement, PAS envoyé à Firebase — les autres ne le verront pas tant que ce n\'est pas corrigé. Vérifie ta connexion et réessaie.\n\nDétail technique : '+e.message);}}
  else { alert('✅ Rakitra enregistré localement.'); reinitialiserFormulaireRakitra(); }
}

// ── DIACRES ──────────────────────────────────────────────────
let nd=0;
function ajouterDiacre(val=''){
  nd++;const id=`diac_${nd}`;
  const div=document.createElement('div');div.style.position='relative';
  div.innerHTML=`<div style="font-size:10px;font-weight:600;color:var(--texte2);text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px">Diacre ${nd}</div>
    <input type="text" id="${id}" value="${val}" placeholder="Nom…"
      style="width:100%;border:1.5px solid var(--gris2);border-radius:7px;padding:8px 10px;font-size:14px;font-family:'Inter',sans-serif"
      oninput="showSug('${id}',this.value)" onblur="hideSug('${id}')">
    <div id="sug_${id}" style="position:absolute;top:100%;left:0;right:0;background:white;border:1.5px solid var(--vert);border-radius:8px;z-index:200;box-shadow:0 4px 14px rgba(0,0,0,.12);display:none"></div>`;
  document.getElementById('diacres-grille').appendChild(div);
}
function showSug(id,val){
  const box=document.getElementById('sug_'+id);
  if(!val){box.style.display='none';return;}
  const f=DIACRES_CONNUS.filter(n=>n.toLowerCase().includes(val.toLowerCase()));
  if(!f.length){box.style.display='none';return;}
  box.innerHTML=f.map(n=>`<div style="padding:9px 12px;font-size:13px;cursor:pointer;border-bottom:1px solid var(--gris1)" onmousedown="pickSug('${id}','${n}')">${n}</div>`).join('');
  box.style.display='block';
}
function hideSug(id){setTimeout(()=>{const b=document.getElementById('sug_'+id);if(b)b.style.display='none';},180);}
function pickSug(id,nom){document.getElementById(id).value=nom;hideSug(id);}

// ── ANJARAKO ─────────────────────────────────────────────────
let enveloppesJour=[];

function rechercherCarte(val){
  const sug=document.getElementById('carte-sug');
  const prev=document.getElementById('carte-preview');
  if(!val){sug.style.display='none';prev.style.display='none';return;}
  const membres=load(SK_ANJ_M).filter(m=>m.actif!==false);
  const f=membres.filter(m=>String(m.num).startsWith(val));
  if(!f.length){sug.style.display='none';prev.style.display='none';return;}
  sug.innerHTML=f.slice(0,6).map(m=>`<div class="carte-sug-item" onmousedown="choisirCarte(${m.num})"><strong>${m.num}</strong>${m.nom?' — '+m.nom:''}</div>`).join('');
  sug.style.display='block';
  const exact=membres.find(m=>m.num===parseInt(val));
  if(exact){prev.style.display='block';prev.innerHTML=`✅ <strong>Carte n°${exact.num}</strong>${exact.nom?' — '+exact.nom:''}`;}
  else prev.style.display='none';
}
function choisirCarte(num){
  document.getElementById('env-carte').value=num;
  document.getElementById('carte-sug').style.display='none';
  const m=load(SK_ANJ_M).find(m=>m.num===num);
  const p=document.getElementById('carte-preview');
  if(m){p.style.display='block';p.innerHTML=`✅ <strong>Carte n°${m.num}</strong>${m.nom?' — '+m.nom:''}`;}
}
function fermerSugCarte(){setTimeout(()=>{document.getElementById('carte-sug').style.display='none';},180);}

function ajouterEnveloppe(){
  const carte=parseInt(document.getElementById('env-carte').value);
  const mois=document.getElementById('env-mois').value;
  if(!carte){alert('Veuillez saisir un numéro de carte.');return;}
  if(!mois){alert('Veuillez choisir le mois payé.');return;}
  if(enveloppesJour.find(e=>e.carte===carte&&e.mois===mois)){alert(`Carte n°${carte} déjà enregistrée pour ${moisLabel(mois)}.`);return;}
  const m=load(SK_ANJ_M).find(m=>m.num===carte);
  enveloppesJour.push({carte,nom:m?m.nom||'':'',mois});
  document.getElementById('env-carte').value='';
  document.getElementById('carte-preview').style.display='none';
  document.getElementById('env-carte').focus();
  afficherEnveloppesJour();
}
function supprimerEnveloppe(i){enveloppesJour.splice(i,1);afficherEnveloppesJour();}
function afficherEnveloppesJour(){
  const el=document.getElementById('liste-enveloppes');
  const nb=enveloppesJour.length;
  document.getElementById('env-count').textContent=nb;
  mettreAJourBannerAnj();
  if(!nb){el.innerHTML='<div style="text-align:center;color:var(--texte2);padding:14px;font-size:13px">Aucune enveloppe</div>';return;}
  el.innerHTML=enveloppesJour.map((e,i)=>`<div class="env-item">
    <div class="env-badge">${e.carte}</div>
    <div style="flex:1"><div style="font-size:13px;font-weight:600">${e.nom||'Carte n°'+e.carte}</div>
      <div style="font-size:11px;color:var(--texte2)">Pour : <strong>${moisLabel(e.mois)}</strong></div></div>
    <button class="env-del" onclick="supprimerEnveloppe(${i})">✕</button>
  </div>`).join('');
}
function mettreAJourBannerAnj(){
  // Nombre d'enveloppes selon le mode
  const nbDirect = envMode==='nb' ? (parseInt(document.getElementById('env-nb-direct')?.value)||0) : 0;

  const total=parseInt(document.getElementById('anj-total')?.value)||0;
  const nb=enveloppesJour.length;
  const membres=load(SK_ANJ_M).filter(m=>m.actif!==false);
  const nbTotal = nb + nbDirect; // cartes + nombre direct
  const total2 = parseInt(document.getElementById('anj-total')?.value)||0;
  document.getElementById('anj-banner-total').innerHTML=`${fmt(total2)} <span>FCFA</span>`;
  document.getElementById('anj-nb-env-disp').textContent=nbTotal;
  document.getElementById('anj-moy-disp').textContent=nb>0?fmt(Math.round(total/nb))+' F':'—';
  document.getElementById('anj-pct-disp').textContent=membres.length>0?Math.round((nb/membres.length)*100)+'%':'—';
}
function calculerAnjMoisCourant(){
  const hist=load(SK_ANJ_H);
  const mc=moisActuel();
  const obj=parseInt(document.getElementById('anj-objectif')?.value)||1100000;
  const objE=parseInt(document.getElementById('anj-obj-env')?.value)||90;
  const mc7=mc.substring(0,7);
  let cumulM=hist.filter(h=>h.date&&h.date.startsWith(mc7)).reduce((a,h)=>a+(h.total||0),0)
    +(parseInt(document.getElementById('anj-total')?.value)||0);
  let cumulE=hist.filter(h=>h.date&&h.date.startsWith(mc7)).reduce((a,h)=>a+((h.enveloppes||[]).length+(h.nbDirect||0)),0)
    +enveloppesJour.length+(envMode==='nb'?(parseInt(document.getElementById('env-nb-direct')?.value)||0):0);
  const pctM=obj>0?Math.min((cumulM/obj)*100,150):0;
  const pctE=objE>0?Math.min((cumulE/objE)*100,150):0;
  const lm=document.getElementById('anj-pct-label');const bm=document.getElementById('anj-pct-bar');
  const le=document.getElementById('anj-env-label');const be=document.getElementById('anj-env-bar');
  if(lm)lm.textContent=pctM.toFixed(1)+'% ('+fmt(cumulM)+' / '+fmt(obj)+' FCFA)';
  if(bm){bm.style.width=Math.min(pctM,100)+'%';bm.className='pct-fill'+(pctM>=100?' ok':'');}
  if(le)le.textContent=pctE.toFixed(1)+'% ('+cumulE+' / '+objE+' env.)';
  if(be){be.style.width=Math.min(pctE,100)+'%';be.className='pct-fill'+(pctE>=100?' ok':'');}
}
async function enregistrerAnjarako(){
  const date=document.getElementById('rak-date-input')?.value||'';
  const total=parseInt(document.getElementById('anj-total')?.value)||0;
  if(!date){alert('Veuillez renseigner la date.');return;}
  const nbDirect2 = envMode==='nb' ? (parseInt(document.getElementById('env-nb-direct')?.value)||0) : 0;
  const moisDirect = document.getElementById('env-mois-direct')?.value||'';
  const rec={date,total,enveloppes:[...enveloppesJour],nbDirect:nbDirect2,moisDirect,anjMode,envMode};
  const hist=load(SK_ANJ_H);
  const idx=hist.findIndex(h=>h.date===date);
  if(idx>=0){if(!confirm('Remplacer ?'))return;hist[idx]=rec;}else hist.push(rec);
  hist.sort((a,b)=>b.date.localeCompare(a.date));save(SK_ANJ_H,hist);
  if(!_db&&window._db){_db=window._db;_fs=window._fs;}
  if(_db){try{
    const col=_fs.collection(_db,'anjarako');
    const snap=await _fs.getDocs(col);let xId=null,ancienNumero=null;
    snap.forEach(function(ds){if(ds.data().date===date){xId=ds.id;ancienNumero=ds.data().numero;}});
    if(xId){ rec.numero=ancienNumero; await _fs.updateDoc(_fs.doc(_db,'anjarako',xId),rec); }
    else { rec.numero=await prochainNumero('anjarako'); await _fs.addDoc(col,rec); }
    // Écriture automatique dans le Grand Livre Anjarako
    await ecrireGrandLivreAnj(rec);
    logModification('creation','Anjarako n°'+(rec.numero||'?')+' du '+date, fmt(total)+' F');
    alert('✅ Anjarako n°'+(rec.numero||'?')+' du '+date+' enregistré !');
  }catch(e){alert('⚠️ ATTENTION : enregistré sur cet appareil seulement, PAS envoyé à Firebase — les autres ne le verront pas tant que ce n\'est pas corrigé. Vérifie ta connexion et réessaie.\n\nDétail technique : '+e.message);}}
  else alert('✅ Anjarako enregistré localement.');
}
function resetAnjarako(){
  if(!confirm('Effacer la saisie Anjarako ?'))return;
  enveloppesJour=[];
  document.getElementById('anj-total').value='';
  document.getElementById('env-carte').value='';
  document.getElementById('carte-preview').style.display='none';
  afficherEnveloppesJour();mettreAJourBannerAnj();
}


// ── ANJARAKO BILLETAGE ──────────────────────────────────────────
let anjMode = 'billets'; // 'billets' ou 'total'
let envMode = 'carte';  // 'carte' ou 'nb'

function showAnjMode(mode){
  anjMode = mode;
  document.getElementById('anj-zone-billets').style.display = mode==='billets'?'':'none';
  document.getElementById('anj-zone-total').style.display   = mode==='total'?'':'none';
  document.getElementById('anj-mode-btn-billets').classList.toggle('actif', mode==='billets');
  document.getElementById('anj-mode-btn-total').classList.toggle('actif', mode==='total');
  calculerAnjTotal();
}

function showEnvMode(mode){
  envMode = mode;
  document.getElementById('env-zone-carte').style.display = mode==='carte'?'':'none';
  document.getElementById('env-zone-nb').style.display   = mode==='nb'?'':'none';
  document.getElementById('env-mode-btn-carte').classList.toggle('actif', mode==='carte');
  document.getElementById('env-mode-btn-nb').classList.toggle('actif', mode==='nb');
  mettreAJourBannerAnj();
}

function buildAnjBillets(){
  const tbody = document.getElementById('anj-tbody-billets');
  if(!tbody || tbody.children.length > 0) return;
  BILLETS.forEach(function(item){
    const eid = 'anj_b_'+item.v;
    const tr = document.createElement('tr');
    tr.innerHTML = '<td><div class="badge-coupure"><div class="dot" style="background:'+item.color+'"></div>'+item.v.toLocaleString('fr-FR')+' FCFA</div></td>'
      +'<td><input class="qty-input" type="number" id="'+eid+'" min="0" inputmode="numeric" oninput="calculerAnjTotal()"></td>'
      +'<td id="st_'+eid+'">—</td>';
    tbody.appendChild(tr);
  });
}

function calculerAnjTotal(){
  let tot = 0;
  if(anjMode === 'billets'){
    BILLETS.forEach(function(b){
      const q = parseInt(document.getElementById('anj_b_'+b.v)?.value)||0;
      const s = q * b.v; tot += s;
      const el = document.getElementById('st_anj_b_'+b.v);
      if(el) el.textContent = s > 0 ? fmt(s)+' F' : '—';
    });
    document.getElementById('anj-tfoot-billets').textContent = fmt(tot)+' FCFA';
  } else {
    tot = parseInt(document.getElementById('anj-total-direct')?.value)||0;
  }
  // Mettre à jour le champ hidden utilisé partout ailleurs
  const hiddenInp = document.getElementById('anj-total');
  if(hiddenInp) hiddenInp.value = tot;
  const affiche = document.getElementById('anj-total-affiche');
  if(affiche) affiche.textContent = fmt(tot)+' FCFA';
  mettreAJourBannerAnj();
}
// ── VOLA MIVAOKA ─────────────────────────────────────────────
// ── SOURCE DÉPENSE ──────────────────────────────────────────
const srcDep={fiang:'caisse',anj:'caisse'};
function setSrcDep(livre,src,btn){
  srcDep[livre]=src;
  const p=livre==='fiang'?'vf':'va';
  document.getElementById(p+'-src-caisse').classList.toggle('actif',src==='caisse');
  document.getElementById(p+'-src-banque').classList.toggle('actif',src==='banque');
}
let srcK45='caisse';
function setSrcK45(src,btn){
  srcK45=src;
  document.getElementById('k45-src-caisse').classList.toggle('actif',src==='caisse');
  document.getElementById('k45-src-banque').classList.toggle('actif',src==='banque');
}

async function ajouterDepense(livre){
  const p=livre==='fiang'?'vf':'va';
  const date=document.getElementById(p+'-date').value;
  const montant=valeurMontant(p+'-montant');
  const cat=document.getElementById(p+'-cat')?.value?.trim()||'';
  const piece=document.getElementById(p+'-piece')?.value.trim()||'';
  const page=document.getElementById(p+'-page')?.value||'';
  const desc=document.getElementById(p+'-desc').value.trim();
  const auteur=document.getElementById(p+'-auteur')?.value.trim()||'';
  const source=srcDep[livre]||'caisse';

  if(!montant){alert('Veuillez saisir un montant.');return;}
  if(!date){alert('Veuillez saisir une date.');return;}
  if(!desc&&!cat){alert('Veuillez saisir une description ou choisir une ligne budgétaire — ça évite d\'avoir à chercher plus tard dans l\'Excel.');return;}

  // Piste d'audit
  const userEmail=window._auth&&window._auth.currentUser?window._auth.currentUser.email:'';
  const userNom=ROLES_CONFIG[userEmail]?.nom||userEmail;
  const now=new Date().toISOString();
  const numeroDep=await prochainNumero('depenses');

  const rec={
    id:Date.now(),numero:numeroDep,livre,date,montant,cat,piece,page,desc,auteur,source,
    createdBy:userEmail,createdByNom:userNom,createdAt:now
  };

  const dep=load(SK_DEP);
  dep.push(rec);dep.sort((a,b)=>b.date.localeCompare(a.date));save(SK_DEP,dep);

  if(!_db&&window._db){_db=window._db;_fs=window._fs;}
  let firebaseOK=false;
  if(_db){
    try{
      // Sauvegarder dans collection depenses — on ATTEND le résultat réel
      await _fs.addDoc(_fs.collection(_db,'depenses'),rec);
      // Écriture automatique dans le Grand Livre Fiangonana
      if(livre==='fiang'){
        const numeroGL=await prochainNumero('grandlivre_fiang');
        const glRec={
          numero:numeroGL,
          date,montant,es:'S',source,
          rubrique:cat||'DEP',
          libelle:desc||CATEGORIES_BUDGET[cat]||cat||'Dépense',
          piece,page,
          createdBy:userEmail,createdByNom:userNom,createdAt:now,
          savedAt:now,depenseId:rec.id
        };
        await _fs.addDoc(_fs.collection(_db,'grandlivre_fiang'),glRec);
      }
      firebaseOK=true;
    }catch(e){
      console.log('FB dep:',e.message);
      alert('⚠️ La dépense est enregistrée sur cet appareil, mais PAS encore envoyée à Firebase (problème de connexion). Elle sera visible sur les autres appareils seulement après une nouvelle tentative réussie.\n\nDétail : '+e.message);
    }
  }

  // Reset formulaire
  document.getElementById(p+'-montant').value='';
  if(document.getElementById(p+'-piece'))document.getElementById(p+'-piece').value='';
  if(document.getElementById(p+'-page'))document.getElementById(p+'-page').value='';
  document.getElementById(p+'-desc').value='';
  afficherDepenses(livre);
  if(firebaseOK){
    logModification('creation','Dépense n°'+numeroDep+' — '+(livre==='fiang'?'Fiangonana':'Anjarako'), desc+' — '+fmt(montant)+' F');
    alert('✅ Dépense n°'+numeroDep+' enregistrée !');
  }
}
async function supprimerDepense(id){
  if(!confirm('Supprimer ?'))return;
  const depAvant=load(SK_DEP).find(d=>d.id===id);
  save(SK_DEP,load(SK_DEP).filter(d=>d.id!==id));
  if(!_db&&window._db){_db=window._db;_fs=window._fs;}
  if(_db){try{
    const col=_fs.collection(_db,'depenses');
    const snap=await _fs.getDocs(col);
    for(const ds of snap.docs){if(ds.data().id===id){await _fs.deleteDoc(ds.ref);break;}}
    if(depAvant) logModification('suppression','Dépense '+(depAvant.livre==='fiang'?'Fiangonana':'Anjarako'), (depAvant.desc||depAvant.cat||'')+' — '+fmt(depAvant.montant||0)+' F');
  }catch(e){
    console.log('Firebase delete:',e.message);
    alert('⚠️ Supprimé sur cet appareil, mais la suppression n\'a pas pu être envoyée à Firebase (problème de connexion). Elle réapparaîtra peut-être sur les autres appareils. Réessaie plus tard.');
  }}
  afficherDepenses('fiang');afficherDepenses('anj');
}
function afficherDepenses(livre){
  const all=load(SK_DEP).filter(d=>d.livre===livre);
  const total=all.reduce((a,d)=>a+d.montant,0);
  const p=livre==='fiang'?'vf':'va';
  const tEl=document.getElementById(p+'-total');
  const lEl=document.getElementById(p+'-liste');
  if(tEl)tEl.innerHTML=`${fmt(total)} <span>FCFA</span>`;
  if(!lEl)return;
  if(!all.length){lEl.innerHTML='<div style="text-align:center;color:var(--texte2);padding:14px;font-size:13px">Aucune dépense</div>';return;}
  lEl.innerHTML=all.map(d=>`<div class="depense-item">
    <div class="depense-top">
      <span style="font-size:11px;color:var(--texte2)">${d.numero?'n°'+d.numero+' · ':''}${d.date}</span>
      <span class="depense-cat">${d.cat||'—'}</span>
      <span class="depense-montant">-${fmt(d.montant)} F</span>
      <button onclick="supprimerDepense(${d.id})" style="background:none;border:none;color:var(--rouge);cursor:pointer;font-size:16px">✕</button>
    </div>
        <div style="font-size:11px;color:var(--texte2);margin-top:3px;display:flex;gap:10px">${d.page?`<span>📄 Page ${d.page}</span>`:''} ${d.piece?`<span style="color:var(--bleu);font-weight:600">🔢 ${d.piece}</span>`:''}</div>
    ${d.desc?`<div style="font-size:12px;color:var(--texte2);margin-top:2px">${esc(d.desc)}</div>`:''}
    ${d.auteur?`<div style="font-size:11px;color:var(--texte2)">Autorisé par : ${esc(d.auteur)}</div>`:''}
  </div>`).join('');
}

// ── EXPORTS ──────────────────────────────────────────────────
function exportPDF(){window.print();}

function partagerWACulte(){
  const d=snapCulte();
  let m=`✝️ *FKMA ABIDJAN — CULTE DU ${d.date}*\n🕐 ${d.type||'—'} | 📍 ${d.lieu||'—'}\n━━━━━━━━━━━━━━━━━\n`;
  m+=`👥 *Présences :* ${d.presences}${d.isFandraisana?' | 🍷 Mpandray : '+d.mpandray:''}\n`;
  m+=`🎙️ *Mpitarika :* ${d.mpitarika||'—'}\n📖 *Mitory teny :* ${d.mitory||'—'}\n`;
  if(d.theme)m+=`🗓️ *Thème :* ${d.theme}\n`;
  if(d.faits.length){m+=`━━━━━━━━━━━━━━━━━\n⭐ *Faits marquants :*\n`;d.faits.forEach(f=>{m+=`  • ${f.label}${f.noms?' : '+f.noms:''}\n`;});}
  m+=`\n_FKMA Abidjan — Côte d'Ivoire_`;
  window.open('https://wa.me/?text='+encodeURIComponent(m),'_blank');
}

function partagerWARakitra(){
  const dateActuelle=document.getElementById('rak-date-input')?.value||'';
  const d=(dernierRakitraEnregistre&&dernierRakitraEnregistre.date===dateActuelle)
    ? dernierRakitraEnregistre : snapRakitra();
  let m=`🙏 *FKMA — RAKITRA DU ${d.date}*\n━━━━━━━━━━━━━━━━━\n`;
  d.lb.forEach(l=>{if(l.q>0)m+=`  ${l.v.toLocaleString('fr-FR')} F × ${l.q} = ${fmt(l.s)} F\n`;});
  d.lp.forEach(l=>{if(l.q>0)m+=`  ${l.v} F × ${l.q} = ${fmt(l.s)} F\n`;});
  m+=`➜ *Rakitra : ${fmt(d.totalRakitra)} FCFA*\n`;
  if(d.rpOn){m+=`\n🍷 *Raki-pandraisana*\n`;d.lrpb.forEach(l=>{if(l.q>0)m+=`  ${l.v.toLocaleString('fr-FR')} F × ${l.q} = ${fmt(l.s)} F\n`;});d.lrpp.forEach(l=>{if(l.q>0)m+=`  ${l.v} F × ${l.q} = ${fmt(l.s)} F\n`;});m+=`➜ *Raki-pandraisana : ${fmt(d.totalRP)} FCFA*\n`;}
  if(d.rakis.length){
    m+=`\n🎁 *Raki-pisaorana*\n`;
    d.rakis.forEach(r=>{
      m+=`  *${fmt(r.montant)} FCFA*${r.verset?' ('+r.verset+')':''}\n`;
      if(r.repartition&&r.repartition.length){
        r.repartition.forEach(rep=>{
          m+=`    → ${rep.dest} : ${fmt(rep.montant)} F\n`;
        });
      }
    });
  }
  m+=`━━━━━━━━━━━━━━━━━\n🙌 *TOTAL : ${fmt(d.total)} FCFA*`;
  if(d.diacres.length)m+=`\n🙏 Diacres : ${d.diacres.join(' · ')}`;
  m+=`\n_FKMA Abidjan_`;
  window.open('https://wa.me/?text='+encodeURIComponent(m),'_blank');
}

function partagerWAAnjarako(){
  const date=document.getElementById('rak-date-input')?.value||'';
  const total=parseInt(document.getElementById('anj-total')?.value)||0;
  // Privilégier le nombre direct saisi (pas le décompte des numéros)
  const nbDirect=parseInt(document.getElementById('env-nb-direct')?.value)||0;
  const nb = nbDirect > 0 ? nbDirect : enveloppesJour.length;
  let m=`📨 *ANJARAKO — ${date}*\n📩 ${nb} enveloppes | 💰 ${fmt(total)} FCFA\n`;
  const parMois={};
  enveloppesJour.forEach(e=>{if(!parMois[e.mois])parMois[e.mois]=[];parMois[e.mois].push(e.carte);});
  Object.keys(parMois).sort().forEach(mo=>{m+=`  ${moisLabel(mo)} : cartes ${parMois[mo].sort((a,b)=>a-b).join(', ')}\n`;});
  m+=`\n_FKMA Abidjan_`;
  window.open('https://wa.me/?text='+encodeURIComponent(m),'_blank');
}

function partagerWADepenses(livre){
  const all=load(SK_DEP).filter(d=>d.livre===livre);
  const total=all.reduce((a,d)=>a+d.montant,0);
  let m=`💸 *VOLA MIVAOKA — ${livre==='fiang'?'FIANGONANA':'ANJARAKO'}*\n━━━━━━━━━━━━━━━━━\n`;
  all.slice(0,10).forEach(d=>{m+=`  ${d.date} | ${fmt(d.montant)} F | ${d.cat||'—'}${d.desc?' — '+d.desc:''}\n`;});
  m+=`━━━━━━━━━━━━━━━━━\n💰 *Total : ${fmt(total)} FCFA*\n_FKMA Abidjan_`;
  window.open('https://wa.me/?text='+encodeURIComponent(m),'_blank');
}

function exportExcelCulte(){
  const d=snapCulte();const wb=XLSX.utils.book_new();
  const rows=[['CULTE FKMA ABIDJAN'],['Date',d.date,'Type',d.type],['Lieu',d.lieu],[],
    ['PRÉSENCES'],['Isan\'olona',d.presences]];
  if(d.isFandraisana)rows.push(['Mpandray',d.mpandray]);
  rows.push([],['INTERVENANTS'],['Mpitarika',d.mpitarika],['Mitory teny',d.mitory],
    ['Vavaka fitsilovala',d.vavaka],['Mpamaky teny',d.mpamaky],['Thème',d.theme]);
  if(d.faits.length){rows.push([],['FAITS MARQUANTS']);d.faits.forEach(f=>rows.push([f.label,f.noms,f.note]));}
  const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=[{wch:28},{wch:24},{wch:16},{wch:20}];
  XLSX.utils.book_append_sheet(wb,ws,'Culte');XLSX.writeFile(wb,`culte_fkma_${d.date||'date'}.xlsx`);
}

function exportExcelRakitra(){
  const dateActuelle=document.getElementById('rak-date-input')?.value||'';
  const d=(dernierRakitraEnregistre&&dernierRakitraEnregistre.date===dateActuelle)
    ? dernierRakitraEnregistre : snapRakitra();
  const wb=XLSX.utils.book_new();
  const rows=[['RAKITRA — FKMA ABIDJAN'],['Date',d.date],[],
    ['RAKITRA BILLETS'],['Coupure','Quantité','Sous-total']];
  d.lb.forEach(l=>{if(l.q>0)rows.push([l.v,l.q,l.s]);});
  rows.push(['TOTAL BILLETS','',d.tb],[],['RAKITRA PIÈCES'],['Coupure','Quantité','Sous-total']);
  d.lp.forEach(l=>{if(l.q>0)rows.push([l.v,l.q,l.s]);});
  rows.push(['TOTAL PIÈCES','',d.tp],['TOTAL RAKITRA','',d.totalRakitra],[]);
  if(d.rpOn){rows.push(['RAKI-PANDRAISANA']);d.lrpb.forEach(l=>{if(l.q>0)rows.push([l.v,l.q,l.s]);});d.lrpp.forEach(l=>{if(l.q>0)rows.push([l.v,l.q,l.s]);});rows.push(['TOTAL RAKI-PANDRAISANA','',d.totalRP],[]);}
  rows.push(['TOTAL GÉNÉRAL','',d.total]);
  const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=[{wch:20},{wch:12},{wch:18}];
  XLSX.utils.book_append_sheet(wb,ws,'Rakitra');XLSX.writeFile(wb,`rakitra_fkma_${d.date||'date'}.xlsx`);
}

function exporterExcelAnjarako(){
  const date=document.getElementById('rak-date-input')?.value||'';
  const total=parseInt(document.getElementById('anj-total')?.value)||0;
  const wb=XLSX.utils.book_new();
  const rows=[['ANJARAKO FKMA'],['Date',date,'Total',total,'Enveloppes',enveloppesJour.length],[],['N° Carte','Famille','Mois payé']];
  enveloppesJour.forEach(e=>rows.push([e.carte,e.nom||'',moisLabel(e.mois)]));
  const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=[{wch:10},{wch:22},{wch:16}];
  XLSX.utils.book_append_sheet(wb,ws,'Anjarako');XLSX.writeFile(wb,`anjarako_fkma_${date||'date'}.xlsx`);
}

function exporterExcelDepenses(livre){
  const all=load(SK_DEP).filter(d=>d.livre===livre);const wb=XLSX.utils.book_new();
  const rows=[['VOLA MIVAOKA — '+(livre==='fiang'?'FIANGONANA':'ANJARAKO')],[],
    ['N°','Date','Montant','Page','N° Pièce','Ligne budgétaire','Description','Autorisé par']];
  all.forEach(d=>rows.push([d.numero||'',fmtDateExcel(d.date),d.montant,d.page||'',d.piece||'',d.cat||'',d.desc||'',d.auteur||'']));
  rows.push([],[,,,'TOTAL',all.reduce((a,d)=>a+d.montant,0)]);
  const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=[{wch:6},{wch:12},{wch:14},{wch:8},{wch:12},{wch:22},{wch:28},{wch:18}];
  XLSX.utils.book_append_sheet(wb,ws,'Dépenses');XLSX.writeFile(wb,`depenses_${livre}_fkma.xlsx`);
}



// ── ÉCRITURE AUTOMATIQUE GRAND LIVRE ────────────────────────
async function ecrireGrandLivreFiang(d){
  if(!_db) return;
  const col=_fs.collection(_db,'grandlivre_fiang');
  const base={date:d.date,page:d.page||'',lettrage:d.lettrage||'',source:'caisse',savedAt:new Date().toISOString()};
  const ecritures=[];
  // Rakitra tsotra (B1.1)
  if(d.totalRakitra>0) ecritures.push({...base,es:'E',rubrique:'B1.1',libelle:'Rakitra',montant:d.totalRakitra});
  // Raki-pandraisana : NE PLUS écrire ici depuis le 45e anniversaire — voir
  // ecrireRakiPandraisana45() plus bas, qui alimente un livre à part, exclu
  // du budget normal. (Séparation temporaire, le temps de l'événement —
  // à retirer/fusionner après si besoin.)
  // Raki-pisaorana (B2) — chaque offrande
  if(d.rakis&&d.rakis.length){
    d.rakis.forEach(function(r){
      ecritures.push({...base,es:'E',rubrique:'B2',libelle:'Raki-pisaorana',montant:r.montant,verset:r.verset||''});
      // Répartition par destination → sorties
      if(r.repartition&&r.repartition.length){
        r.repartition.forEach(function(rep){
          if(rep.montant>0){
            ecritures.push({...base,es:'S',rubrique:'C7.1',libelle:'Raki-pisaorana → '+rep.dest,montant:rep.montant});
          }
        });
      }
    });
  }
  // Écriture ATOMIQUE : suppression des anciennes écritures + ajout des nouvelles
  // en une seule opération groupée. Si la connexion coupe en cours de route,
  // AUCUN changement n'est appliqué (ni suppression ni ajout) — les données
  // existantes restent intactes. Avant, une coupure entre les deux étapes
  // pouvait effacer une journée entière sans rien réécrire.
  try{
    const numeros=await reserverNumeros('grandlivre_fiang', ecritures.length);
    ecritures.forEach(function(ec,i){ ec.numero=numeros[i]; });
    const existing=await _fs.getDocs(col);
    const toDelete=[];
    existing.forEach(function(ds){if(ds.data().date===d.date&&ds.data().source==='caisse'&&!ds.data().transfert)toDelete.push(ds.ref);});
    const batch=_fs.writeBatch(_db);
    toDelete.forEach(function(ref){batch.delete(ref);});
    ecritures.forEach(function(ec){batch.set(_fs.doc(col),ec);});
    await batch.commit();
  }catch(e){
    alert('⚠️ Échec de l\'enregistrement du Grand Livre Fiangonana. Rien n\'a été modifié, tes données précédentes sont intactes. Vérifie ta connexion et réessaie.\n\nDétail : '+e.message);
    throw e;
  }
}

async function ecrireGrandLivreAnj(rec){
  if(!_db) return;
  const col=_fs.collection(_db,'grandlivre_anj');
  const base={date:rec.date,page:'',lettrage:'',source:'caisse',savedAt:new Date().toISOString()};
  // Écriture ATOMIQUE (voir explication dans ecrireGrandLivreFiang ci-dessus) :
  // suppression des anciennes écritures auto + ajout de la nouvelle, tout ou rien.
  try{
    const numeroGL=await prochainNumero('grandlivre_anj');
    const existing=await _fs.getDocs(col);
    const toDelete=[];
    existing.forEach(function(ds){if(ds.data().date===rec.date&&ds.data().auto===true)toDelete.push(ds.ref);});
    const batch=_fs.writeBatch(_db);
    toDelete.forEach(function(ref){batch.delete(ref);});
    batch.set(_fs.doc(col),{...base,numero:numeroGL,es:'E',rubrique:'ANJ-E1',libelle:'Anjarako voaray',montant:rec.total,auto:true});
    await batch.commit();
  }catch(e){
    alert('⚠️ Échec de l\'enregistrement du Grand Livre Anjarako. Rien n\'a été modifié, tes données précédentes sont intactes. Vérifie ta connexion et réessaie.\n\nDétail : '+e.message);
    throw e;
  }
}

// ── RAKI-PANDRAISANA → GRAND LIVRE K45 ──────────────────────────
// Le Raki-pandraisana est hors budget Fiangonana, donc écrit comme une
// Entrée dans le Grand Livre K45 (rubrique K45-E1, déjà prévue), qui
// existe déjà précisément pour ce genre de montant hors budget normal.
// On tague ces écritures pour ne remplacer que les siennes lors d'une
// re-saisie du même jour, sans toucher aux écritures K45 manuelles.
async function ecrireRakiPandraisana45(d){
  if(!_db || !(d.rpOn && d.totalRP>0)) return;
  const col=_fs.collection(_db,'grandlivre_k45');
  try{
    const numero=await prochainNumero('grandlivre_k45');
    const existing=await _fs.getDocs(col);
    const toDelete=[];
    existing.forEach(function(ds){if(ds.data().date===d.date&&ds.data().autoRakiPandraisana===true)toDelete.push(ds.ref);});
    const batch=_fs.writeBatch(_db);
    toDelete.forEach(function(ref){batch.delete(ref);});
    batch.set(_fs.doc(col),{
      numero,date:d.date,montant:d.totalRP,es:'E',source:'caisse',
      page:d.page||'',lettrage:d.lettrage||'',
      rubrique:'K45-E1',libelle:'Raki-pandraisana',
      autoRakiPandraisana:true,savedAt:new Date().toISOString()
    });
    await batch.commit();
  }catch(e){
    alert('⚠️ Échec de l\'enregistrement du Raki-pandraisana dans le Grand Livre K45. Rien n\'a été modifié. Vérifie ta connexion et réessaie.\n\nDétail : '+e.message);
    throw e;
  }
}
async function chargerDepenses(){
  if(!_db)return;
  try{
    const snap=await _fs.getDocs(_fs.collection(_db,'depenses'));
    const deps=[];
    snap.forEach(function(ds){deps.push(ds.data());});
    deps.sort(function(a,b){return (b.date||'').localeCompare(a.date||'');});
    save(SK_DEP,deps);
    afficherDepenses('fiang');afficherDepenses('anj');
  }catch(e){console.log('Erreur chargement dépenses:',e.message);}
}

async function chargerAnjarako(){
  if(!_db)return;
  try{
    const snap=await _fs.getDocs(_fs.collection(_db,'anjarako'));
    const hist=[];
    snap.forEach(function(ds){hist.push(ds.data());});
    hist.sort(function(a,b){return (b.date||'').localeCompare(a.date||'');});
    save(SK_ANJ_H,hist);
  }catch(e){console.log('Erreur chargement anjarako:',e.message);}
}

// Manquait jusqu'ici : le Rakitra (Fiangonana) n'était jamais synchronisé
// depuis Firebase vers le stockage local utilisé par le Tableau de bord.
async function chargerRakitra(){
  if(!_db)return;
  try{
    const snap=await _fs.getDocs(_fs.collection(_db,'rakitra'));
    const hist=[];
    snap.forEach(function(ds){hist.push(ds.data());});
    hist.sort(function(a,b){return (b.date||'').localeCompare(a.date||'');});
    save(SK_RAKITRA,hist);
  }catch(e){console.log('Erreur chargement rakitra:',e.message);}
}

// Manquait jusqu'ici : les cultes (Journal K45) n'étaient jamais synchronisés
// depuis Firebase — c'est pour ça que le Tableau de bord (cultes, présences)
// restait toujours vide même quand des cultes étaient bien enregistrés.
async function chargerCultes(){
  if(!_db)return;
  try{
    const snap=await _fs.getDocs(_fs.collection(_db,'journal_k45'));
    const hist=[];
    snap.forEach(function(ds){hist.push(ds.data());});
    hist.sort(function(a,b){return (b.date||'').localeCompare(a.date||'');});
    save(SK_CULTES,hist);
  }catch(e){console.log('Erreur chargement cultes:',e.message);}
}


// ── MODIFIER SAISIE EXISTANTE ─────────────────────────────────
async function peuplerHistSelect(){
  const sel=document.getElementById('hist-select-date');
  sel.innerHTML='<option value="">Chargement…</option>';
  // Lire depuis Firebase
  let rakDates=[],anjDates=[];
  if(_db){
    try{
      const snapR=await _fs.getDocs(_fs.collection(_db,'rakitra'));
      snapR.forEach(ds=>rakDates.push(ds.data().date));
      const snapA=await _fs.getDocs(_fs.collection(_db,'anjarako'));
      snapA.forEach(ds=>anjDates.push(ds.data().date));
    }catch(e){console.log('Hist:',e.message);}
  } else {
    // Fallback localStorage
    rakDates=load(SK_RAKITRA).map(h=>h.date);
    anjDates=load(SK_ANJ_H).map(h=>h.date);
  }
  const allDates=[...new Set([...rakDates,...anjDates])].sort((a,b)=>b.localeCompare(a));
  sel.innerHTML='<option value="">— Choisir une date —</option>';
  if(!allDates.length){sel.innerHTML+='<option disabled>Aucune saisie trouvée</option>';return;}
  allDates.forEach(function(d){
    const hasR=rakDates.includes(d);
    const hasA=anjDates.includes(d);
    const label=d+(hasR?' 🙏':'')+(hasA?' 📨':'');
    sel.innerHTML+='<option value="'+d+'">'+label+'</option>';
  });
}

let _dateSelectionnee=null;
async function chargerSaisieDate(date){
  _dateSelectionnee=date;
  const actions=document.getElementById('hist-actions');
  const info=document.getElementById('hist-info');
  if(!date){actions.style.display='none';info.style.display='none';return;}
  // Chercher dans Firebase
  let rak=null,anj=null;
  if(_db){
    try{
      const snapR=await _fs.getDocs(_fs.collection(_db,'rakitra'));
      snapR.forEach(ds=>{if(ds.data().date===date)rak=ds.data();});
      const snapA=await _fs.getDocs(_fs.collection(_db,'anjarako'));
      snapA.forEach(ds=>{if(ds.data().date===date)anj=ds.data();});
    }catch(e){console.log('Date:',e.message);}
  } else {
    rak=load(SK_RAKITRA).find(h=>h.date===date);
    anj=load(SK_ANJ_H).find(h=>h.date===date);
  }
  actions.style.display='flex';
  info.style.display='block';
  let txt='📅 '+date+' :\n';
  if(rak) txt+='🙏 Rakitra : '+fmt(rak.totalRakitra||rak.total||0)+' FCFA\n';
  else txt+='🙏 Rakitra : non saisi\n';
  if(anj) txt+='📨 Anjarako : '+fmt(anj.total||0)+' FCFA';
  else txt+='📨 Anjarako : non saisi';
  info.textContent=txt;
}
async function chargerRakitraHist(){
  if(!_dateSelectionnee){alert('Veuillez choisir une date.');return;}
  let rak=null;
  if(_db){
    try{
      const snap=await _fs.getDocs(_fs.collection(_db,'rakitra'));
      snap.forEach(ds=>{if(ds.data().date===_dateSelectionnee)rak=ds.data();});
    }catch(e){}
  }
  if(!rak) rak=load(SK_RAKITRA).find(h=>h.date===_dateSelectionnee);
  if(!rak){alert('Aucun Rakitra pour cette date.');return;}
  document.querySelectorAll('.nav-btn')[0].click();
  const dateInp=document.getElementById('rak-date-input');
  if(dateInp) dateInp.value=rak.date;
  if(document.getElementById('rak-page')) document.getElementById('rak-page').value=rak.page||'';
  if(document.getElementById('rak-lettrage')) document.getElementById('rak-lettrage').value=rak.lettrage||'';
  BILLETS.forEach(function(b){
    const el=document.getElementById('b_'+b.v);
    const found=rak.lb?rak.lb.find(function(x){return x.v===b.v;}):null;
    if(el) el.value=found&&found.q>0?found.q:'';
  });
  PIECES.forEach(function(p){
    const el=document.getElementById('p_'+p.v);
    const found=rak.lp?rak.lp.find(function(x){return x.v===p.v;}):null;
    if(el) el.value=found&&found.q>0?found.q:'';
  });
  if(document.getElementById('tres-nom')) document.getElementById('tres-nom').value=rak.tresNom||'';
  if(document.getElementById('tres-obs')) document.getElementById('tres-obs').value=rak.tresObs||'';
  if(document.getElementById('observations')) document.getElementById('observations').value=rak.obs||'';

  // Raki-pandraisana : cocher si besoin et restaurer les billets/pièces
  const toggleRP=document.getElementById('toggle-raki-pandraisana');
  const avaitRP=!!(rak.rpOn && (rak.totalRP>0 || rak.rpb>0 || rak.rpp>0));
  if(toggleRP){
    toggleRP.checked=avaitRP;
    toggleRakiPandraisana();
    if(avaitRP){
      BILLETS.forEach(function(b){
        const el=document.getElementById('rpb_'+b.v);
        const found=rak.lrpb?rak.lrpb.find(function(x){return x.v===b.v;}):null;
        if(el) el.value=found&&found.q>0?found.q:'';
      });
      PIECES.forEach(function(p){
        const el=document.getElementById('rpp_'+p.v);
        const found=rak.lrpp?rak.lrpp.find(function(x){return x.v===p.v;}):null;
        if(el) el.value=found&&found.q>0?found.q:'';
      });
    }
  }

  // Raki-pisaorana (offrandes + répartition)
  document.getElementById('raki-liste').innerHTML='';
  nRaki=0;
  (rak.rakis||[]).forEach(function(r){
    ajouterRaki();
    const id='raki_'+nRaki;
    document.getElementById(id+'_m').value=r.montant||'';
    document.getElementById(id+'_v').value=r.verset||'';
    document.getElementById(id+'_lignes').innerHTML='';
    (r.repartition&&r.repartition.length?r.repartition:[{dest:'',montant:0}]).forEach(function(rep){
      ajouterLigneDest(id);
      const lid=id+'_l'+nLigne;
      const selEl=document.getElementById(lid+'_dest');
      const estConnu=DEST_DEFAUT.includes(rep.dest);
      if(selEl) selEl.value=estConnu?rep.dest:'Autre';
      if(!estConnu&&rep.dest){
        const autreEl=document.getElementById(lid+'_autre');
        if(autreEl){autreEl.style.display='';autreEl.value=rep.dest;}
      }
      const mEl=document.getElementById(lid+'_m');
      if(mEl) mEl.value=rep.montant||'';
    });
    calculerRepartition(id);
  });

  // Diacres
  document.getElementById('diacres-grille').innerHTML='';
  nd=0;
  if(rak.diacres&&rak.diacres.length){
    rak.diacres.forEach(function(nom){ ajouterDiacre(nom); });
  } else {
    ajouterDiacre(); ajouterDiacre();
  }

  calculerRakitra();
  calculerRaki();
  alert('✅ Rakitra du '+rak.date+' rechargé en entier (y compris Raki-pandraisana, offrandes et diacres) — vérifie puis enregistre.');
}

async function chargerAnjHist(){
  if(!_dateSelectionnee){alert('Veuillez choisir une date.');return;}
  let anj=null;
  if(_db){
    try{
      const snap=await _fs.getDocs(_fs.collection(_db,'anjarako'));
      snap.forEach(ds=>{if(ds.data().date===_dateSelectionnee)anj=ds.data();});
    }catch(e){}
  }
  if(!anj) anj=load(SK_ANJ_H).find(h=>h.date===_dateSelectionnee);
  if(!anj){alert('Aucun Anjarako pour cette date.');return;}
  document.querySelectorAll('.nav-btn')[1].click();
  const dateInp=document.getElementById('rak-date-input');
  if(dateInp) dateInp.value=anj.date;
  const totalInp=document.getElementById('anj-total');
  if(totalInp) totalInp.value=anj.total||'';
  enveloppesJour=[...(anj.enveloppes||[])];
  afficherEnveloppesJour();
  alert('✅ Anjarako du '+anj.date+' rechargé — modifie et enregistre.');
}
// ── DASHBOARD ────────────────────────────────────────────────
let dashAnnee=new Date().getFullYear();
function changerAnnee(d){dashAnnee+=d;renderDashboard();}

function renderDashboard(){
  document.getElementById('dash-annee-label').textContent=dashAnnee;
  const yr=String(dashAnnee);
  const rak=load(SK_RAKITRA).filter(h=>h.date&&h.date.startsWith(yr));
  const anj=load(SK_ANJ_H).filter(h=>h.date&&h.date.startsWith(yr));
  const dep=load(SK_DEP).filter(d=>d.date&&d.date.startsWith(yr));
  const cul=load(SK_CULTES).filter(h=>h.date&&h.date.startsWith(yr));
  const tR=rak.reduce((a,h)=>a+h.totalRakitra+(h.totalRP||0),0);
  const tRP=rak.reduce((a,h)=>a+(h.totalRP||0),0);
  const tRakiPis=rak.reduce((a,h)=>a+(h.totalRaki||0),0);
  const tA=anj.reduce((a,h)=>a+(h.total||0),0);
  const tD=dep.reduce((a,d)=>a+d.montant,0);
  const tP=cul.reduce((a,h)=>a+(h.presences||0),0);
  const solde=tR+tA+tRakiPis-tD;
  document.getElementById('kpi-rakitra').textContent=fmt(tR)+' F';
  document.getElementById('kpi-anjarako').textContent=fmt(tA)+' F';
  document.getElementById('kpi-raki-pis').textContent=fmt(tRakiPis)+' F';
  document.getElementById('kpi-depenses').textContent=fmt(tD)+' F';
  document.getElementById('kpi-solde').textContent=fmt(solde)+' F';
  document.getElementById('kpi-presences').textContent=fmt(tP);
  const soldeKpi=document.getElementById('kpi-solde').closest('.kpi');
  if(soldeKpi)soldeKpi.style.borderTopColor=solde>=0?'var(--cyan)':'var(--rouge)';
  renderDashFinances();
  renderDashPresences();
  renderDashCultes();
}

function renderDashFinances(){
  const yr=String(dashAnnee);
  const rak=load(SK_RAKITRA).filter(h=>h.date&&h.date.startsWith(yr));
  const anj=load(SK_ANJ_H).filter(h=>h.date&&h.date.startsWith(yr));
  const dep=load(SK_DEP).filter(d=>d.date&&d.date.startsWith(yr));
  const tbody=document.getElementById('dash-tbody-fin');tbody.innerHTML='';
  let tR=0,tRP=0,tA=0,tD=0;
  for(let m=0;m<12;m++){
    const ym=yr+'-'+String(m+1).padStart(2,'0');
    const r=rak.filter(h=>h.date.startsWith(ym)).reduce((a,h)=>a+h.totalRakitra,0);
    const rp=rak.filter(h=>h.date.startsWith(ym)).reduce((a,h)=>a+(h.totalRP||0),0);
    const a=anj.filter(h=>h.date.startsWith(ym)).reduce((a,h)=>a+(h.total||0),0);
    const d=dep.filter(x=>x.date.startsWith(ym)).reduce((a,x)=>a+x.montant,0);
    const solde=(r+rp+a)-d;tR+=r;tRP+=rp;tA+=a;tD+=d;
    const tr=document.createElement('tr');
    if(!r&&!a&&!d)tr.style.opacity='.35';
    tr.innerHTML=`<td><strong>${MOIS_FR[m].substring(0,3)}</strong></td>
      <td>${r>0?fmt(r)+' F':'—'}</td><td>${rp>0?fmt(rp)+' F':'—'}</td>
      <td>${a>0?fmt(a)+' F':'—'}</td>
      <td style="color:var(--rouge)">${d>0?'-'+fmt(d)+' F':'—'}</td>
      <td style="color:${solde>=0?'var(--vert)':'var(--rouge)'};font-weight:700">${(r||rp||a||d)?fmt(solde)+' F':'—'}</td>`;
    tbody.appendChild(tr);
  }
  document.getElementById('dash-tfoot-fin').innerHTML=
    `<td>TOTAL</td><td>${fmt(tR)} F</td><td>${fmt(tRP)} F</td><td>${fmt(tA)} F</td>
     <td style="color:var(--rouge)">-${fmt(tD)} F</td>
     <td style="color:${(tR+tA-tD)>=0?'var(--vert)':'var(--rouge)'}">${fmt(tR+tA-tD)} F</td>`;
}

function renderDashPresences(){
  const yr=String(dashAnnee);
  const cul=load(SK_CULTES).filter(h=>h.date&&h.date.startsWith(yr));
  const tbody=document.getElementById('dash-tbody-pres');tbody.innerHTML='';
  let tP=0,tC=0,tF=0,tM=0;
  for(let m=0;m<12;m++){
    const ym=yr+'-'+String(m+1).padStart(2,'0');
    const rows=cul.filter(h=>h.date.startsWith(ym));
    const nb=rows.length;const pres=rows.reduce((a,h)=>a+(h.presences||0),0);
    const fandr=rows.filter(h=>h.isFandraisana).length;
    const mpand=rows.reduce((a,h)=>a+(h.mpandray||0),0);
    tP+=pres;tC+=nb;tF+=fandr;tM+=mpand;
    const tr=document.createElement('tr');if(!nb)tr.style.opacity='.35';
    tr.innerHTML=`<td><strong>${MOIS_FR[m].substring(0,3)}</strong>${fandr>0?' 🍷':''}</td>
      <td>${nb||'—'}</td><td>${pres>0?fmt(pres):'—'}</td>
      <td>${nb>0?Math.round(pres/nb):'—'}</td><td>${fandr>0?fandr+'×':'—'}</td><td>${mpand>0?mpand:'—'}</td>`;
    tbody.appendChild(tr);
  }
  document.getElementById('dash-tfoot-pres').innerHTML=
    `<td>TOTAL</td><td>${tC}</td><td>${fmt(tP)}</td><td>${tC>0?Math.round(tP/tC):'—'}</td><td>${tF}×</td><td>${tM}</td>`;
}

function renderDashCultes(){
  const yr=String(dashAnnee);
  const cul=load(SK_CULTES).filter(h=>h.date&&h.date.startsWith(yr));
  const rak=load(SK_RAKITRA);
  const tbody=document.getElementById('dash-tbody-cultes');tbody.innerHTML='';
  if(!cul.length){tbody.innerHTML=`<tr><td colspan="5" style="text-align:center;padding:14px;color:var(--texte2)">Aucun culte enregistré pour ${dashAnnee}</td></tr>`;return;}
  cul.forEach(h=>{
    const r=rak.find(x=>x.date===h.date);
    const tr=document.createElement('tr');
    tr.innerHTML=`<td style="white-space:nowrap">${h.date}</td>
      <td style="font-size:11px">${(h.type||'—').substring(0,20)}</td>
      <td style="font-size:11px">${h.mitory||'—'}</td>
      <td>${h.presences>0?h.presences+(h.isFandraisana?' 🍷':''):'—'}</td>
      <td>${r?fmt(r.total)+' F':'—'}</td>`;
    tbody.appendChild(tr);
  });
}

function exporterDashExcel(){
  const yr=String(dashAnnee);const wb=XLSX.utils.book_new();
  const rak=load(SK_RAKITRA).filter(h=>h.date&&h.date.startsWith(yr));
  const anj=load(SK_ANJ_H).filter(h=>h.date&&h.date.startsWith(yr));
  const dep=load(SK_DEP).filter(d=>d.date&&d.date.startsWith(yr));
  const cul=load(SK_CULTES).filter(h=>h.date&&h.date.startsWith(yr));
  const rows=[['BILAN FKMA ABIDJAN — '+dashAnnee],[],
    ['Mois','Cultes','Présences','Rakitra','Raki-pand.','Anjarako','Dépenses','Solde']];
  for(let m=0;m<12;m++){
    const ym=yr+'-'+String(m+1).padStart(2,'0');
    const c=cul.filter(h=>h.date.startsWith(ym));
    const r=rak.filter(h=>h.date.startsWith(ym)).reduce((a,h)=>a+h.totalRakitra,0);
    const rp=rak.filter(h=>h.date.startsWith(ym)).reduce((a,h)=>a+(h.totalRP||0),0);
    const a=anj.filter(h=>h.date.startsWith(ym)).reduce((a,h)=>a+(h.total||0),0);
    const d=dep.filter(x=>x.date.startsWith(ym)).reduce((a,x)=>a+x.montant,0);
    rows.push([MOIS_FR[m],c.length,c.reduce((a,h)=>a+(h.presences||0),0),r,rp,a,d,(r+rp+a)-d]);
  }
  const ws=XLSX.utils.aoa_to_sheet(rows);
  ws['!cols']=[{wch:12},{wch:8},{wch:12},{wch:14},{wch:14},{wch:14},{wch:12},{wch:14}];
  XLSX.utils.book_append_sheet(wb,ws,'Bilan '+dashAnnee);
  XLSX.writeFile(wb,'bilan_fkma_'+dashAnnee+'.xlsx');
}

function exporterDashWA(){
  const yr=String(dashAnnee);
  const rak=load(SK_RAKITRA).filter(h=>h.date&&h.date.startsWith(yr));
  const anj=load(SK_ANJ_H).filter(h=>h.date&&h.date.startsWith(yr));
  const dep=load(SK_DEP).filter(d=>d.date&&d.date.startsWith(yr));
  const cul=load(SK_CULTES).filter(h=>h.date&&h.date.startsWith(yr));
  const tR=rak.reduce((a,h)=>a+h.totalRakitra+(h.totalRP||0),0);
  const tA=anj.reduce((a,h)=>a+(h.total||0),0);
  const tD=dep.reduce((a,d)=>a+d.montant,0);
  const tP=cul.reduce((a,h)=>a+(h.presences||0),0);
  let m=`✝️ *BILAN FKMA ABIDJAN — ${dashAnnee}*\n━━━━━━━━━━━━━━━━━\n`;
  m+=`📅 ${cul.length} cultes | 👥 ${fmt(tP)} présences\n`;
  m+=`🙏 Rakitra : *${fmt(tR)} FCFA*\n📨 Anjarako : *${fmt(tA)} FCFA*\n💸 Dépenses : *${fmt(tD)} FCFA*\n`;
  m+=`━━━━━━━━━━━━━━━━━\n💰 *Solde net : ${fmt(tR+tA-tD)} FCFA*\n\n_FKMA Abidjan — Côte d'Ivoire_`;
  window.open('https://wa.me/?text='+encodeURIComponent(m),'_blank');
}


// ── JS JOURNAL K45 ───────────────────────────────────────────



// ── AUTHENTIFICATION ────────────────────────────────────────────
// Correspondance code rubrique → libellé lisible (pour l'export Excel / affichage)
const CATEGORIES_BUDGET = {
  "C1.1":"Ezaka Pst Andria",
  "C1.2":"Kojakoja fitandremana Pst Rakotoniaina",
  "C2.1":"Sekoly Alahady",
  "C3.1":"Mpitoriteny ivelany",
  "C3.2":"Fanampiana asa fitoriana",
  "C3.3":"Fanampiana Fiangonana / SAMUEL",
  "C4.1":"Moissons \"Les Béatitudes\"",
  "C4.2":"Anjara fikarakarana ny fiangonana",
  "C4.3":"Mpanadio trano",
  "C4.4":"Fanofana trano ivelany",
  "C5.1":"Famangiana - Tsodrano",
  "C5.2":"Asa vavolombelona",
  "C5.3":"Fisintonanan'ny Fiangonana",
  "C5.4.1":"Fiofanan'ny Mpitandrina",
  "C5.5":"Divay sy mofo Fandraisana",
  "C6.1":"Fampitaovana",
  "C6.2":"Banky",
  "C6.3":"Samihafa",
  "C6.5":"Prise en charge sanitaire Mpitandrina",
  "C6.6":"Tranokala www.fkma.ci",
  "C7.1":"Raki-pisaorana & fanomezana"
};

// ── BUDGET 2026 (TETIBOLA) ───────────────────────────────────────
// Montants approuvés, repris du fichier TETIBOLA_FKMA_2026 fourni.
// Sous-codes fusionnés dans leur code parent (ex: C6.1.1 → C6.1).
// Montants absents du fichier d'origine mis à 0 (à confirmer plus tard).
const BUDGET_2026_ENTREES = {
  "B1.1":{libelle:"Rakitra alahady \"tsotra\"",budget:7260000},
  "B1.2":{libelle:"Rakitra alitara",budget:900000},
  "B2":{libelle:"Raki-pisaorana & fanomezana ary fara-rakitra",budget:700000},
  "B3":{libelle:"Rakitra samihafa",budget:450000},
  "B4":{libelle:"Rakitra Herinandro Masina, Andro Fiakarana ary Krismasy",budget:350000},
  "B5":{libelle:"Hetsika farimbona",budget:0},
  "B6":{libelle:"Rakitra 26 jona",budget:0},
  "B7":{libelle:"Fanampiana manokana rakitra",budget:150000},
  "B8":{libelle:"SAMUEL / CENTENAIRE EM-CI",budget:0}
};
const BUDGET_2026_DEPENSES = {
  "C1.1":{libelle:CATEGORIES_BUDGET["C1.1"],budget:600000},
  "C1.2":{libelle:CATEGORIES_BUDGET["C1.2"],budget:1080000},
  "C2.1":{libelle:CATEGORIES_BUDGET["C2.1"],budget:500000},
  "C3.1":{libelle:CATEGORIES_BUDGET["C3.1"],budget:250000},
  "C3.2":{libelle:CATEGORIES_BUDGET["C3.2"]+" (+ TAFO EM-CI)",budget:1600000},
  "C3.3":{libelle:CATEGORIES_BUDGET["C3.3"],budget:0},
  "C4.1":{libelle:CATEGORIES_BUDGET["C4.1"],budget:500000},
  "C4.2":{libelle:CATEGORIES_BUDGET["C4.2"],budget:800000},
  "C4.3":{libelle:CATEGORIES_BUDGET["C4.3"],budget:200000},
  "C4.4":{libelle:CATEGORIES_BUDGET["C4.4"],budget:360000},
  "C5.1":{libelle:CATEGORIES_BUDGET["C5.1"],budget:900000},
  "C5.2":{libelle:CATEGORIES_BUDGET["C5.2"],budget:200000},
  "C5.3":{libelle:CATEGORIES_BUDGET["C5.3"],budget:1350000},
  "C5.4.1":{libelle:CATEGORIES_BUDGET["C5.4.1"],budget:300000},
  "C5.5":{libelle:CATEGORIES_BUDGET["C5.5"],budget:0},
  "C6.1":{libelle:CATEGORIES_BUDGET["C6.1"],budget:0},
  "C6.2":{libelle:CATEGORIES_BUDGET["C6.2"],budget:80000},
  "C6.3":{libelle:CATEGORIES_BUDGET["C6.3"],budget:65000},
  "C6.5":{libelle:CATEGORIES_BUDGET["C6.5"],budget:600000},
  "C6.6":{libelle:CATEGORIES_BUDGET["C6.6"],budget:35000},
  "C7.1":{libelle:CATEGORIES_BUDGET["C7.1"],budget:0}
};

// Liste des comptes (nom, rôle, libellé) — chargée depuis Firebase (collection "roles"),
// plus besoin de modifier ce fichier pour ajouter quelqu'un.
let ROLES_CONFIG = {};
let _rolesConfigCharge = false;
async function chargerRolesConfig(){
  if(_rolesConfigCharge) return; // déjà chargé, on ne recharge pas à chaque connexion
  try{
    if(!window._db) return;
    const snap=await window._fs.getDocs(window._fs.collection(window._db,'roles'));
    const cfg={};
    snap.forEach(function(ds){
      const d=ds.data();
      cfg[ds.id]={nom:d.nom||ds.id, role:d.role||'inconnu', label:d.label||d.role||'Inconnu'};
    });
    ROLES_CONFIG=cfg;
    _rolesConfigCharge=true;
  }catch(e){ console.log('Chargement des comptes:',e.message); }
}

// ── FIREBASE READY ────────────────────────────────────────────
let db = null, fs = null;



function showACList(lst, q, onPick){
  const ql = q.toLowerCase();
  const matches = MEMBRES.filter(m=>m.nom.toLowerCase().includes(ql)).slice(0,8);
  let html = '';
  matches.forEach(m=>{
    const idx = m.nom.toLowerCase().indexOf(ql);
    const hl  = m.nom.slice(0,idx)+'<strong>'+m.nom.slice(idx,idx+ql.length)+'</strong>'+m.nom.slice(idx+ql.length);
    const bm  = m.mpandray ? '<span class="acibm">Mpandray</span>' : '';
    html += `<div class="aci" data-nom="${m.nom}"><span class="aciname">${hl}</span><span class="acisub">${m.genre}</span>${bm}</div>`;
  });
  const exact = MEMBRES.find(m=>m.nom.toLowerCase()===ql);
  if(!exact && q.length>=2)
    html += `<div class="aci" data-nom="${q}"><span class="aciname">${q}</span><span class="acibn">+ Nouveau</span></div>`;
  if(!html){ lst.style.display='none'; return; }
  lst.innerHTML = html;
  lst.style.display = 'block';
  lst.querySelectorAll('.aci').forEach(el=>{
    el.addEventListener('mousedown', e=>{
      e.preventDefault();
      onPick(el.getAttribute('data-nom'));
      lst.style.display='none';
      majApercu();
    });
  });
}

function initAC(inputId, listId, onPick){
  const inp = document.getElementById(inputId);
  const lst = document.getElementById(listId);
  if(!inp||!lst) return;
  inp.addEventListener('input', function(){
    const q = this.value.trim();
    if(!q){ lst.style.display='none'; return; }
    showACList(lst, q, onPick);
  });
  inp.addEventListener('blur', ()=>setTimeout(()=>lst.style.display='none', 200));
  inp.addEventListener('focus', function(){ if(this.value.trim()) showACList(lst,this.value.trim(),onPick); });
}

function moisActuel(){const n=new Date();return n.getFullYear()+'-'+String(n.getMonth()+1).padStart(2,'0');}

function initIntervenants(){
  ['mpitarika','mitory','vavaka'].forEach(field=>{
    initAC('f-'+field, 'acl-'+field, nom=>{ document.getElementById('f-'+field).value=nom; });
  });
  const inpMp = document.getElementById('f-mpamaky-inp');
  const lstMp = document.getElementById('acl-mpamaky');
  inpMp.addEventListener('input', function(){
    const q = this.value.trim();
    if(!q){ lstMp.style.display='none'; return; }
    showACList(lstMp, q, nom=>{ ajouterTag(nom); inpMp.value=''; });
  });
  inpMp.addEventListener('blur', ()=>setTimeout(()=>lstMp.style.display='none', 200));
  inpMp.addEventListener('keydown', e=>{
    if(e.key==='Enter'||e.key===','){
      e.preventDefault();
      const v=inpMp.value.trim().replace(/,$/,'');
      if(v){ ajouterTag(v); inpMp.value=''; lstMp.style.display='none'; }
    }
  });
}

// ── TAGS ─────────────────────────────────────────────────────
let tagsListe = [];
function ajouterTag(nom){ nom=nom.trim(); if(!nom||tagsListe.includes(nom))return; tagsListe.push(nom); renderTags(); majApercu(); }
function supprimerTag(nom){ tagsListe=tagsListe.filter(n=>n!==nom); renderTags(); majApercu(); }
function renderTags(){
  const wrap=document.getElementById('tw-mpamaky');
  wrap.querySelectorAll('.tg').forEach(t=>t.remove());
  const acDiv=wrap.querySelector('.acw');
  tagsListe.forEach(nom=>{
    const tag=document.createElement('span'); tag.className='tg';
    const span=document.createElement('span'); span.textContent=nom;
    const btn=document.createElement('button'); btn.textContent='×';
    btn.addEventListener('click', function(){ supprimerTag(nom); });
    tag.appendChild(span); tag.appendChild(btn);
    wrap.insertBefore(tag,acDiv);
  });
}

// ── TOGGLE FANDRAISANA ────────────────────────────────────────
function toggleFandr(){
  const on=document.getElementById('tog-f').checked;
  document.getElementById('zone-pres').innerHTML = on ? `
    <div class="g2">
      <div class="ch"><label>Isan'olona (total)</label>
        <input type="number" id="f-pres" min="0" placeholder="0" inputmode="numeric"></div>
      <div class="ch"><label>Mpandray</label>
        <input type="number" id="f-mpandray" min="0" placeholder="0" inputmode="numeric"></div>
    </div>` : `
    <div class="ch"><label>Isan'olona (total présents)</label>
      <input type="number" id="f-pres" min="0" placeholder="0" inputmode="numeric"></div>`;
  majApercu();
}

// ── FAITS MARQUANTS ───────────────────────────────────────────

function ajouterFait(){
  nFaits++;const id='f'+nFaits;
  const div=document.createElement('div'); div.className='fc'; div.id='fait-'+id;
  const opts=FAITS_TYPES.map(f=>`<option value="${f.id}">${f.label}</option>`).join('');
  div.innerHTML=`
    <div class="ft">
      <select class="fs" id="${id}-type">${opts}<option value="custom">Autre…</option></select>
      <button class="fd" onclick="document.getElementById('fait-${id}').remove();majApercu()">✕</button>
    </div>
    <div class="acw" style="margin-bottom:5px;position:relative">
      <input class="finp" id="${id}-noms" placeholder="Noms des personnes…" autocomplete="off">
      <div class="acl" id="acl-${id}"></div>
    </div>
    <input class="finp" id="${id}-note" placeholder="Note complémentaire…" style="margin-bottom:0">`;
  document.getElementById('faits-liste').appendChild(div);
  // AC pour noms
  const inpF=document.getElementById(id+'-noms');
  const lstF=document.getElementById('acl-'+id);
  inpF.addEventListener('input', function(){
    const parts=this.value.split(',');
    const q=parts[parts.length-1].trim();
    if(!q){ lstF.style.display='none'; return; }
    showACList(lstF, q, nom=>{
      const vals=this.value.split(',').map(v=>v.trim()).filter(Boolean);
      vals.pop(); vals.push(nom);
      this.value=vals.join(', ');
      lstF.style.display='none'; majApercu();
    });
  });
  inpF.addEventListener('blur', ()=>setTimeout(()=>lstF.style.display='none', 200));
  document.getElementById(id+'-type').addEventListener('change', majApercu);
  inpF.addEventListener('input', majApercu);
}

// ── APERÇU ────────────────────────────────────────────────────
function majApercu(){
  const date   =document.getElementById('f-date').value;
  const type   =document.getElementById('f-type').value;
  const lieu   =document.getElementById('f-lieu').value;
  const pres   =document.getElementById('f-pres')?.value||'';
  const mpand  =document.getElementById('f-mpandray')?.value||'';
  const isFandr=document.getElementById('tog-f').checked;
  const mpit   =document.getElementById('f-mpitarika').value;
  const mitory =document.getElementById('f-mitory').value;
  const sermon =document.getElementById('f-sermon').value;
  const ref    =document.getElementById('f-ref').value;
  const theme  =document.getElementById('f-theme').value;
  const photoNum=document.getElementById('f-photo-num').value;

  const elD=document.getElementById('ap-date');
  const elT=document.getElementById('ap-type');
  const elB=document.getElementById('ap-body');

  if(date){ const d=new Date(date+'T00:00:00'); elD.textContent=d.toLocaleDateString('fr-FR',{weekday:'long',year:'numeric',month:'long',day:'numeric'}); }
  else elD.textContent='—';
  elT.textContent=(type||'—')+(lieu?' · '+lieu:'');

  let html='';
  if(pres) html+=`<div class="apr"><span class="apl">Présences</span><span class="apv">${pres}${isFandr&&mpand?' · '+mpand+' Mpandray':''}</span></div>`;
  if(mpit)   html+=`<div class="apr"><span class="apl">Mpitarika</span><span class="apv">${mpit}</span></div>`;
  if(mitory) html+=`<div class="apr"><span class="apl">Mitory teny</span><span class="apv">${mitory}</span></div>`;
  if(tagsListe.length) html+=`<div class="apr"><span class="apl">Mpamaky</span><span class="apv">${tagsListe.join(' · ')}</span></div>`;
  if(sermon) html+=`<div class="apr"><span class="apl">Sermon</span><span class="apv">${sermon}${ref?' — '+ref:''}</span></div>`;
  if(theme)  html+=`<div class="apr"><span class="apl">Thème</span><span class="apv">${theme}</span></div>`;
  if(photoNum) html+=`<div class="apr"><span class="apl">📷 Photo</span><span class="apv">${photoNum}</span></div>`;

  document.querySelectorAll('[id$="-type"].fs').forEach(sel=>{
    const base=sel.id.replace('-type','');
    const noms=document.getElementById(base+'-noms')?.value||'';
    const lbl =sel.options[sel.selectedIndex]?.text||'';
    if(lbl) html+=`<div class="apf">⭐ ${lbl}${noms?' — '+noms:''}</div>`;
  });
  elB.innerHTML=html||'<div class="apvide">Continue à remplir ✍️</div>';
}

// ── SNAP DATA ─────────────────────────────────────────────────
function snapData(){
  const faits=[];
  document.querySelectorAll('[id$="-type"].fs').forEach(sel=>{
    const base=sel.id.replace('-type','');
    faits.push({
      type: sel.value,
      label: sel.options[sel.selectedIndex]?.text||'',
      noms: document.getElementById(base+'-noms')?.value||'',
      note: document.getElementById(base+'-note')?.value||''
    });
  });
  return {
    date:          document.getElementById('f-date').value,
    type:          document.getElementById('f-type').value,
    lieu:          document.getElementById('f-lieu').value,
    isFandraisana: document.getElementById('tog-f').checked,
    presences:     parseInt(document.getElementById('f-pres')?.value)||0,
    mpandray:      parseInt(document.getElementById('f-mpandray')?.value)||0,
    mpitarika:     document.getElementById('f-mpitarika').value,
    mitory:        document.getElementById('f-mitory').value,
    vavaka:        document.getElementById('f-vavaka').value,
    mpamaky:       [...tagsListe],
    theme:         document.getElementById('f-theme').value,
    sermon:        document.getElementById('f-sermon').value,
    ref:           document.getElementById('f-ref').value,
    photoNum:      document.getElementById('f-photo-num').value,
    photoCap:      document.getElementById('f-photo-cap').value,
    faits,
    savedAt:       new Date().toISOString()
  };
}

// ── ENREGISTRER DANS FIREBASE ─────────────────────────────────
async function enregistrer(){
  // Toujours lire depuis window pour éviter les problèmes de timing
  const db=window._db; const fs=window._fs;
  if(!db){ alert('Firebase non connecté. Vérifier la connexion.'); return; }
  const d=snapData();
  if(!d.date){ alert('Veuillez renseigner la date.'); return; }

  const btn=document.querySelector('.bv');
  btn.innerHTML='<i class="ti ti-loader" style="animation:spin 1s linear infinite"></i> Enregistrement…';
  btn.disabled=true;

  try{
    const colRef=fs.collection(db,'journal_k45');
    // Chercher si une entrée existe déjà pour cette date+type
    const snap=await fs.getDocs(colRef);
    let existId=null;
    snap.forEach(docSnap=>{
      const data=docSnap.data();
      if(data.date===d.date && data.type===d.type) existId=docSnap.id;
    });
    if(_ficheEnCoursId){
      // Mode modification — mettre à jour la fiche existante
      await fs.updateDoc(fs.doc(db,'journal_k45',_ficheEnCoursId), d);
      logModification('modification','Fiche Journal K45 du '+d.date, d.type||'');
      alert('✅ Fiche mise à jour !');
      _ficheEnCoursId=null;
      btn.innerHTML='<i class="ti ti-device-floppy"></i> Enregistrer dans Firebase';
      btn.style.background='var(--vert)';
    } else if(existId){
      if(!confirm('Une fiche existe déjà pour ce culte. Remplacer ?')){
        btn.innerHTML='<i class="ti ti-device-floppy"></i> Enregistrer dans Firebase';
        btn.disabled=false;
        return;
      }
      await fs.updateDoc(fs.doc(db,'journal_k45',existId), d);
      logModification('modification','Fiche Journal K45 du '+d.date, d.type||'');
      alert('✅ Fiche mise à jour dans Firebase !');
    } else {
      d.numero=await prochainNumero('journal_k45');
      await fs.addDoc(colRef, d);
      logModification('creation','Fiche Journal K45 n°'+d.numero+' du '+d.date, d.type||'');
      alert('✅ Nouvelle page n°'+d.numero+' enregistrée dans Firebase !');
    }
    chargerHistorique();
  } catch(err){
    alert('Erreur Firebase : '+err.message);
  }
  btn.innerHTML='<i class="ti ti-device-floppy"></i> Enregistrer dans Firebase';
  btn.disabled=false;
}

// ── CHARGER HISTORIQUE ────────────────────────────────────────
async function chargerHistorique(){
  const _email=window._auth&&window._auth.currentUser?window._auth.currentUser.email:"";
  const _cfg=ROLES_CONFIG[_email]||{};
  const _role=_cfg.role||"";
  const canEditK45=_role==="secretaire"||_role==="diacre"||_role==="diacre_journal";

  const db=window._db; const fs=window._fs;
  if(!db) return;
  const liste=document.getElementById('hist-liste');
  liste.innerHTML='<div class="apvide">Chargement…</div>';
  try{
    const snap=await fs.getDocs(fs.query(fs.collection(db,'journal_k45'), fs.orderBy('date','desc')));
    if(snap.empty){ liste.innerHTML='<div class="apvide">Aucune page enregistrée pour l\'instant</div>'; return; }
    let html='';
    let n=snap.size;
    snap.forEach(docSnap=>{
      const d=docSnap.data();
      const dd=new Date((d.date||'')+'T00:00:00');
      const dateStr=d.date?dd.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):'—';
      const docId=docSnap.id;
      html+=`<div class="hist-item">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="flex:1">
            <div class="hist-date">${d.numero?'Page n°'+d.numero:'Page'} · ${dateStr}</div>
            <div class="hist-type">${d.type||'—'} · ${d.lieu||'—'}</div>
            <div class="hist-meta">
              ${d.presences?`<span>👥 ${d.presences}</span>`:''}
              ${d.isFandraisana&&d.mpandray?`<span>🍷 ${d.mpandray} Mpandray</span>`:''}
              ${d.mitory?`<span>📖 ${d.mitory}</span>`:''}
              ${d.photoNum?`<span>📷 ${d.photoNum}</span>`:''}
              ${d.faits?.length?`<span>⭐ ${d.faits.length} fait(s)</span>`:''}
            </div>
          </div>
          <button onclick="modifierFiche('${docId}')"
            style="background:var(--bleu);color:white;border:none;border-radius:8px;
              padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer;flex-shrink:0">
            ✏️ Modifier
          </button>
        </div>
      </div>`;
    });
    liste.innerHTML=html;
  } catch(err){
    liste.innerHTML='<div class="apvide" style="color:var(--rouge)">Erreur : '+err.message+'</div>';
  }
}

// ── WHATSAPP ──────────────────────────────────────────────────
function envoyerWA(){
  const d=snapData();
  if(!d.date){alert("Veuillez renseigner la date.");return;}
  const dd=new Date(d.date+"T00:00:00");
  const dateStr=dd.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const NL=String.fromCharCode(10);
  const SEP="━━━━━━━━━━━━━━━━━━━━";
  let msg="";
  msg+="✝️ *FKMA ABIDJAN — RAPPORT DU CULTE*"+NL;
  msg+=SEP+NL;
  msg+="📅 *"+dateStr+"*"+NL;
  if(d.type) msg+="🕐 "+d.type+NL;
  if(d.lieu) msg+="📍 "+d.lieu+NL+NL;
  if(d.presences){
    msg+="👥 *Présences :* "+d.presences+" personnes";
    if(d.isFandraisana&&d.mpandray) msg+=" _(dont "+d.mpandray+" Mpandray)_";
    msg+=NL;
  }
  msg+=NL+"🎙️ *Intervenants :*"+NL;
  if(d.mpitarika) msg+="  • Mpitarika : "+d.mpitarika+NL;
  if(d.mitory)    msg+="  • Mitory teny : "+d.mitory+NL;
  if(d.vavaka)    msg+="  • Vavaka fitsilovala : "+d.vavaka+NL;
  if(d.mpamaky&&d.mpamaky.length) msg+="  • Mpamaky teny : "+d.mpamaky.join(", ")+NL;
  if(d.sermon||d.ref||d.theme){
    msg+=NL+"📖 *Sermon :*"+NL;
    if(d.sermon) msg+="  "+d.sermon+NL;
    if(d.ref)    msg+="  _"+d.ref+"_"+NL;
    if(d.theme)  msg+="  Thème du mois : "+d.theme+NL;
  }
  if(d.faits&&d.faits.length){
    msg+=NL+"⭐ *Faits marquants :*"+NL;
    d.faits.forEach(function(f){ msg+="  • "+f.label+(f.noms?" : "+f.noms:"")+NL; });
  }
  msg+=NL+SEP+NL+"_FKMA Abidjan — Journal K45_";
  window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');
}



// ── MODIFIER UNE FICHE ──────────────────────────────────────────
let _ficheEnCoursId = null;

async function modifierFiche(docId){
  if(!_db){alert('Firebase non connecté.');return;}
  try{
    const docRef=_fs.doc(_db,'journal_k45',docId);
    const snap=await _fs.getDocs(_fs.collection(_db,'journal_k45'));
    let d=null;
    snap.forEach(function(ds){if(ds.id===docId)d=ds.data();});
    if(!d){alert('Fiche introuvable.');return;}
    _ficheEnCoursId=docId;
    // Basculer sur l'onglet Saisie
    document.querySelectorAll('.tab-btn')[0].click();
    // Remplir les champs
    document.getElementById('f-date').value=d.date||'';
    document.getElementById('f-type').value=d.type||'';
    document.getElementById('f-lieu').value=d.lieu||'';
    document.getElementById('f-mpitarika').value=d.mpitarika||'';
    document.getElementById('f-mitory').value=d.mitory||'';
    document.getElementById('f-vavaka').value=d.vavaka||'';
    document.getElementById('f-theme').value=d.theme||'';
    document.getElementById('f-sermon').value=d.sermon||'';
    document.getElementById('f-ref').value=d.ref||'';
    document.getElementById('f-photo-num').value=d.photoNum||'';
    document.getElementById('f-photo-cap').value=d.photoCap||'';
    // Toggle Fandraisana
    const tog=document.getElementById('tog-f');
    tog.checked=d.isFandraisana||false;
    toggleFandr();
    if(d.presences) setTimeout(function(){
      const p=document.getElementById('f-pres');if(p)p.value=d.presences;
      const mp=document.getElementById('f-mpandray');if(mp)mp.value=d.mpandray||'';
    },100);
    // Mpamaky teny (tags)
    tagsListe=[];
    if(d.mpamaky&&d.mpamaky.length){
      d.mpamaky.forEach(function(nom){ajouterTag(nom);});
    }
    // Faits marquants
    document.getElementById('faits-liste').innerHTML='';
    nFaits=0;
    if(d.faits&&d.faits.length){
      d.faits.forEach(function(f){
        ajouterFait();
        const id='f'+nFaits;
        const sel=document.getElementById(id+'-type');
        const nomsInp=document.getElementById(id+'-noms');
        const noteInp=document.getElementById(id+'-note');
        if(sel){for(let i=0;i<sel.options.length;i++){if(sel.options[i].value===f.type){sel.selectedIndex=i;break;}}}
        if(nomsInp)nomsInp.value=f.noms||'';
        if(noteInp)noteInp.value=f.note||'';
      });
    }
    // Changer le bouton enregistrer en mode modification
    const btn=document.querySelector('.bv');
    btn.innerHTML='<i class="ti ti-edit"></i> Mettre à jour cette fiche';
    btn.style.background='var(--orange)';
    majApercu();
    alert('✅ Fiche chargée — modifie et appuie sur "Mettre à jour".');
  }catch(err){alert('Erreur : '+err.message);}
}
// ── INIT ──────────────────────────────────────────────────────
document.getElementById('f-date').valueAsDate=new Date();

['f-date','f-type','f-lieu','f-mpitarika','f-mitory','f-vavaka',
 'f-theme','f-sermon','f-ref','f-photo-num','f-photo-cap'].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.addEventListener('input', majApercu);
});

initIntervenants();
majApercu();


// ── JS GRAND LIVRE ───────────────────────────────────────────


// fmt défini dans les utilitaires Gestion
let GL={fiang:[],anj:[],k45:[]};
let obES='S';

// ── AUTH ─────────────────────────────────────────────────────

// ── NAVIGATION ────────────────────────────────────────────────
function showGLTab(tab,btn){
  document.querySelectorAll('#section-gl .tab-btn').forEach(b=>b.classList.remove('actif'));
  if(btn) btn.classList.add('actif');
  ['fiang','anj','k45','ops','synth'].forEach(function(t){
    const el=document.getElementById('gl-tab-'+t);
    if(el) el.style.display=t===tab?'':'none';
  });
  if(tab==='synth')renderSynth();
  if(tab==='fiang'||tab==='anj'||tab==='k45') chargerTout();
}

// ── CHARGEMENT FIREBASE ───────────────────────────────────────
async function chargerTout(){
  const db=window._db,fs=window._fs;
  if(!db)return;
  await chargerSoldesInitiaux();
  await chargerRakitra();
  await chargerCultes();
  for(const livre of ['fiang','anj','k45']){
    try{
      const snap=await fs.getDocs(fs.collection(db,'grandlivre_'+livre));
      GL[livre]=[];
      snap.forEach(ds=>GL[livre].push({...ds.data(),_id:ds.id}));
      GL[livre].sort((a,b)=>a.date.localeCompare(b.date));
      renderLivre(livre);
      renderSoldes(livre);
    }catch(e){console.log('GL '+livre+':',e.message);}
  }
  renderSynth();
}

// ── SOLDES INITIAUX (passation du 1er juillet 2026) ─────────────
// Enregistrés une seule fois dans Firebase pour ne pas avoir à les
// retaper à chaque ouverture de l'appli ou sur un autre appareil.
async function chargerSoldesInitiaux(){
  try{
    const db=window._db,fs=window._fs;
    if(!db) return;
    const ref=fs.doc(db,'config','soldes_initiaux');
    const snap=await fs.getDocs(fs.query(fs.collection(db,'config')));
    let data=null;
    snap.forEach(ds=>{if(ds.id==='soldes_initiaux')data=ds.data();});
    if(!data) return; // rien enregistré encore, on garde les champs à 0
    const map={
      'fiang-init-caisse':data.fiangCaisse,
      'fiang-init-banque':data.fiangBanque,
      'anj-init-caisse':data.anjCaisse,
      'anj-init-banque':data.anjBanque,
      'k45-init-caisse':data.k45Caisse,
      'k45-init-banque':data.k45Banque
    };
    Object.keys(map).forEach(id=>{
      const el=document.getElementById(id);
      if(el&&map[id]!==undefined) el.value=map[id];
    });
  }catch(e){ console.log('Soldes initiaux:',e.message); }
}
async function sauvegarderSoldesInitiaux(){
  try{
    const db=window._db,fs=window._fs;
    if(!db) return;
    const data={
      fiangCaisse:parseFloat(document.getElementById('fiang-init-caisse')?.value)||0,
      fiangBanque:parseFloat(document.getElementById('fiang-init-banque')?.value)||0,
      anjCaisse:parseFloat(document.getElementById('anj-init-caisse')?.value)||0,
      anjBanque:parseFloat(document.getElementById('anj-init-banque')?.value)||0,
      k45Caisse:parseFloat(document.getElementById('k45-init-caisse')?.value)||0,
      k45Banque:parseFloat(document.getElementById('k45-init-banque')?.value)||0
    };
    await fs.setDoc(fs.doc(db,'config','soldes_initiaux'),data);
    logModification('modification','Soldes initiaux (passation 1er juillet 2026)',
      'Caisse Fiang: '+fmt(data.fiangCaisse)+' | Banque Fiang: '+fmt(data.fiangBanque)+
      ' | Caisse Anj: '+fmt(data.anjCaisse)+' | Banque Anj: '+fmt(data.anjBanque)+
      ' | Caisse K45: '+fmt(data.k45Caisse)+' | Banque K45: '+fmt(data.k45Banque));
  }catch(e){
    console.log('Sauvegarde soldes initiaux:',e.message);
    alert('⚠️ Le solde initial est enregistré sur cet appareil, mais pas encore synchronisé avec Firebase. Réessaie plus tard.');
  }
}


// ── RENDU LISTE ───────────────────────────────────────────────
function renderLivre(livre){
  const el=document.getElementById(livre+'-liste');
  if(!el)return;
  const list=GL[livre];
  if(!list.length){el.innerHTML='<div class="vide">Aucune \u00e9criture pour l\u0027instant — saisis dans Gestion pour voir les données ici</div>';return;}

  const initCaisse=parseFloat(document.getElementById(livre+'-init-caisse')?.value)||0;
  const initBanque=parseFloat(document.getElementById(livre+'-init-banque')?.value)||0;

  let soldeCaisse=initCaisse, soldeBanque=initBanque;
  // Rôle depuis Firebase Auth ou window._currentRole
  const userEmail=window._auth&&window._auth.currentUser?window._auth.currentUser.email:'';
  const userCfg=ROLES_CONFIG[userEmail]||{};
  const currentRole=userCfg.role||window._currentRole||'';
  const canDelete=currentRole==='secretaire'||currentRole==='diacre';
  const canModify=canDelete||currentRole==='tresoriere';
  el.innerHTML=list.map(function(e){
    const isE=e.es==='E';
    const src=e.source||'caisse';
    const mnt=e.montant||0;
    if(src==='caisse'||src===livre)soldeCaisse+=(isE?mnt:-mnt);
    else if(src==='banque')soldeBanque+=(isE?mnt:-mnt);
    const soldeAff=src==='banque'?soldeBanque:soldeCaisse;
    return '<div class="eitem'+(isE?'':' s')+'">'
      +'<div class="etop">'
      +'<span class="edate">'+(e.numero?'n°'+e.numero+' · ':'')+e.date+(e.page?' · P.'+e.page:'')+(e.lettrage?' · '+e.lettrage:'')+'</span>'
      +'<span class="emnt '+(isE?'e':'s')+'">'+(isE?'+':'-')+fmt(mnt)+' F</span>'
      +'</div>'
      +(e.rubrique?'<div class="erub">'+e.rubrique+'</div>':'')
      +(e.libelle?'<div style="font-size:12px;margin-bottom:2px">'+e.libelle+'</div>':'')
      +'<div class="emeta">'
      +'<span>'+(src==='banque'?'🏦 Banque':'💵 Caisse')+'</span>'
      +(e.piece?'<span>🔢 '+e.piece+'</span>':'')
      +(e.comment?'<span>💬 '+e.comment+'</span>':'')
      +(e.horsbudget?'<span style="color:var(--orange)">ℹ️ Hors budget</span>':'')
      +(e.createdByNom?'<span style="color:#aaa;font-size:10px">✍️ '+e.createdByNom+'</span>':'')
      +(e.modifiedByNom?'<span style="color:#aaa;font-size:10px"> · ✏️ '+e.modifiedByNom+' ('+((e.modifiedAt||'').slice(0,10))+')</span>':'')
      +'<span style="margin-left:auto;font-weight:600;color:'+(soldeAff>=0?'var(--vert)':'var(--rouge)')+'">Solde: '+fmt(soldeAff)+' F</span>'
      +'</div>'
      +(canDelete?'<div style="display:flex;gap:8px;margin-top:6px">'+'<button data-id="'+(e._id||'')+'" data-livre="'+livre+'" onclick="modifierEcritureGL(this)" style="background:none;border:1px solid var(--bleu);border-radius:5px;color:var(--bleu);font-size:11px;cursor:pointer;padding:2px 8px">✏️ Modifier</button>'+'<button data-id="'+(e._id||'')+'" data-livre="'+livre+'" onclick="supprimerEcritureGL(this)" style="background:none;border:1px solid var(--rouge);border-radius:5px;color:var(--rouge);font-size:11px;cursor:pointer;padding:2px 8px">✕ Supprimer</button>'+'</div>':'')
      +'</div>';
  }).join('');
}

function renderFiang(){renderLivre('fiang');renderSoldes('fiang');}
function renderAnj(){renderLivre('anj');renderSoldes('anj');}

// ── SOLDES ────────────────────────────────────────────────────
function renderSoldes(livre){
  const list=GL[livre]||[];
  const initC=parseFloat(document.getElementById(livre+'-init-caisse')?.value)||0;
  const initB=parseFloat(document.getElementById(livre+'-init-banque')?.value)||0;
  let caisse=initC,banque=initB;
  list.forEach(function(e){
    const src=e.source||'caisse';
    const mnt=e.montant||0;
    const sig=e.es==='E'?1:-1;
    if(src==='banque')banque+=sig*mnt;
    else caisse+=sig*mnt;
  });
  const tot=caisse+banque;
  const setEl=(id,val)=>{
    const el=document.getElementById(id);
    if(el){el.textContent=fmt(val)+' FCFA';el.className='solval '+(val>=0?'spos':'sneg');}
  };
  setEl(livre+'-sol-caisse',caisse);
  setEl(livre+'-sol-banque',banque);
  setEl(livre+'-sol-total',tot);
}

// ── SYNTHÈSE ──────────────────────────────────────────────────
function renderSynth(){
  const calc=livre=>{
    const initC=parseFloat(document.getElementById(livre+'-init-caisse')?.value)||0;
    const initB=parseFloat(document.getElementById(livre+'-init-banque')?.value)||0;
    let c=initC,b=initB;
    (GL[livre]||[]).forEach(e=>{const s=e.source||'caisse';const m=e.montant||0;const sg=e.es==='E'?1:-1;if(s==='banque')b+=sg*m;else c+=sg*m;});
    return c+b;
  };
  const tf=calc('fiang'),ta=calc('anj'),tk45=calc('k45');
  const set=(id,v)=>{const el=document.getElementById(id);if(el){el.textContent=fmt(v)+' F';el.style.color=v>=0?'var(--vert)':'var(--rouge)';}};
  set('syn-fiang',tf);set('syn-anj',ta);set('syn-k45',tk45);set('syn-tot',tf+ta);
}

// ── OPÉRATIONS BANCAIRES ──────────────────────────────────────
function setObES(es){
  obES=es;
  document.getElementById('ob-es-e').classList.toggle('actif',es==='E');
  document.getElementById('ob-es-s').classList.toggle('actif',es==='S');
}

async function faireTransfert(){
  const db=window._db,fs=window._fs;
  if(!db){alert('Firebase non connecté.');return;}
  const livre=document.getElementById('tr-livre').value;
  const date=document.getElementById('tr-date').value;
  const montant=valeurMontant('tr-montant');
  const page=document.getElementById('tr-page').value;
  const comment=document.getElementById('tr-comment').value;
  const piece=document.getElementById('tr-piece').value;
  if(!date||!montant){alert('Date et montant requis.');return;}
  const base={date,page,montant,comment,piece,transfert:true,savedAt:new Date().toISOString()};
  try{
    const [numS,numE]=await reserverNumeros('grandlivre_'+livre,2);
    // Sortie caisse
    await fs.addDoc(fs.collection(db,'grandlivre_'+livre),{...base,numero:numS,es:'S',source:'caisse',libelle:'Versement banque',rubrique:'VB'});
    // Entrée banque
    await fs.addDoc(fs.collection(db,'grandlivre_'+livre),{...base,numero:numE,es:'E',source:'banque',libelle:'Versement depuis caisse',rubrique:'VB'});
    logModification('creation','Transfert Caisse→Banque n°'+numS+'/'+numE+' ('+livre+')', fmt(montant)+' F du '+date);
    alert('✅ Transfert enregistré !');
    ['tr-date','tr-montant','tr-page','tr-comment','tr-piece'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    await chargerTout();
  }catch(e){alert('Erreur : '+e.message);}
}

async function enregistrerOpBancaire(){
  const db=window._db,fs=window._fs;
  if(!db){alert('Firebase non connecté.');return;}
  const livre=document.getElementById('ob-livre').value;
  const date=document.getElementById('ob-date').value;
  const montant=valeurMontant('ob-montant');
  const nature=document.getElementById('ob-nature').value;
  const comment=document.getElementById('ob-comment').value;
  if(!date||!montant||!nature){alert('Date, montant et nature requis.');return;}
  try{
    const numeroOb=await prochainNumero('grandlivre_'+livre);
    await fs.addDoc(fs.collection(db,'grandlivre_'+livre),{
      numero:numeroOb,
      date,montant,es:obES,source:'banque',rubrique:nature,
      libelle:document.getElementById('ob-nature').options[document.getElementById('ob-nature').selectedIndex].text,
      comment,opbancaire:true,savedAt:new Date().toISOString()
    });
    logModification('creation','Opération bancaire n°'+numeroOb+' ('+livre+')', fmt(montant)+' F du '+date);
    alert('✅ Opération bancaire n°'+numeroOb+' enregistrée !');
    ['ob-date','ob-montant','ob-comment'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    await chargerTout();
  }catch(e){alert('Erreur : '+e.message);}
}

function faireRapprochement(){
  const livre=document.getElementById('rp-livre').value;
  const soldeReel=parseFloat(document.getElementById('rp-solde-reel').value)||0;
  const initB=parseFloat(document.getElementById(livre+'-init-banque')?.value)||0;
  let soldeBanque=initB;
  (GL[livre]||[]).forEach(function(e){
    if((e.source||'caisse')==='banque'){soldeBanque+=(e.es==='E'?1:-1)*(e.montant||0);}
  });
  const ecart=soldeReel-soldeBanque;
  document.getElementById('rp-resultat').style.display='block';
  document.getElementById('rp-theo').textContent=fmt(soldeBanque)+' F';
  document.getElementById('rp-reel').textContent=fmt(soldeReel)+' F';
  document.getElementById('rp-ecart').textContent=fmt(Math.abs(ecart))+' F';
  document.getElementById('rp-ecart').className=ecart===0?'ecart-ok':'ecart-nok';
  const msg=document.getElementById('rp-msg');
  if(ecart===0){
    msg.textContent='✅ Comptes équilibrés — aucun écart';
    msg.style.cssText='background:#e8f5ee;color:var(--vert);margin-top:8px;font-size:12px;text-align:center;padding:6px;border-radius:6px;';
  } else {
    msg.textContent='⚠️ Écart de '+fmt(Math.abs(ecart))+' F — vérifier les opérations bancaires manquantes';
    msg.style.cssText='background:#fdecea;color:var(--rouge);margin-top:8px;font-size:12px;text-align:center;padding:6px;border-radius:6px;';
  }
}


// ── K45 SAISIE ────────────────────────────────────────────────
let k45ES='E';
function setK45ES(es){
  k45ES=es;
  document.getElementById('k45-es-e').classList.toggle('actif',es==='E');
  document.getElementById('k45-es-s').classList.toggle('actif',es==='S');
}

async function enregistrerK45(){
  const db=window._db,fs=window._fs;
  if(!db){alert('Firebase non connecté.');return;}
  const date=document.getElementById('k45-date').value;
  const montant=valeurMontant('k45-montant');
  const rubrique=document.getElementById('k45-rubrique').value;
  if(!date||!montant||!rubrique){alert('Date, montant et rubrique requis.');return;}
  const rec={
    date,montant,es:k45ES,source:srcK45,
    page:document.getElementById('k45-page').value||'',
    lettrage:document.getElementById('k45-lettrage').value.toUpperCase()||'',
    rubrique,
    libelle:document.getElementById('k45-libelle').value||'',
    piece:document.getElementById('k45-piece').value||'',
    saispar:document.getElementById('k45-saispar').value||'',
    savedAt:new Date().toISOString()
  };
  try{
    rec.numero=await prochainNumero('grandlivre_k45');
    const docRef=await fs.addDoc(fs.collection(db,'grandlivre_k45'),rec);
    GL['k45'].push({...rec,_id:docRef.id});
    GL['k45'].sort((a,b)=>a.date.localeCompare(b.date));
    renderLivre('k45');renderSoldes('k45');renderSynth();
    ['k45-date','k45-montant','k45-page','k45-lettrage','k45-libelle','k45-piece'].forEach(id=>{
      const el=document.getElementById(id);if(el)el.value='';
    });
    document.getElementById('k45-rubrique').value='';
    setK45ES('E');
    setSrcK45('caisse');
    logModification('creation','Écriture Grand Livre K45 n°'+rec.numero, (rec.libelle||rec.rubrique)+' — '+fmt(montant)+' F ('+srcK45+')');
    alert('✅ Écriture K45 n°'+rec.numero+' enregistrée !');
  }catch(e){alert('Erreur : '+e.message);}
}

// ── MODIFIER ÉCRITURE GRAND LIVRE ──────────────────────────
function modifierEcritureGL(btn){
  var db=window._db, fs=window._fs;
  var id=btn.getAttribute('data-id');
  var livre=btn.getAttribute('data-livre');
  var ec=null;
  if(GL[livre]) GL[livre].forEach(function(e){if(e._id===id)ec=e;});
  if(!ec){alert('Écriture introuvable.');return;}

  var date=prompt('Date (AAAA-MM-JJ):',ec.date||'');
  if(!date)return;
  var montant=prompt('Montant (FCFA):',ec.montant||0);
  if(!montant)return;
  var libelle=prompt('Libellé:',ec.libelle||'');
  var page=prompt('N° Page:',ec.page||'');

  var updates={date:date,montant:parseInt(montant)||0,libelle:libelle||'',page:page||'',updatedAt:new Date().toISOString()};

  (async function(){
    try{
      if(db&&fs) await fs.updateDoc(fs.doc(db,'grandlivre_'+livre,id),updates);
      var idx=-1;
      GL[livre].forEach(function(e,i){if(e._id===id)idx=i;});
      if(idx>=0) GL[livre][idx]=Object.assign({},GL[livre][idx],updates);
      renderLivre(livre);renderSoldes(livre);renderSynth();
      logModification('modification','Écriture Grand Livre '+livre, (libelle||ec.libelle||'')+' — '+fmt(parseInt(montant)||0)+' F');
      alert('Écriture mise à jour !');
    }catch(e){alert('Erreur : '+e.message);}
  })();
}

// ── SUPPRESSION ÉCRITURE GL ──────────────────────────────────────
async function supprimerEcritureGL(btn){
  const db=window._db,fs=window._fs;
  if(!db){alert('Firebase non connecté.');return;}
  const id=btn.getAttribute('data-id');
  const livre=btn.getAttribute('data-livre');
  if(!id){alert('ID introuvable.');return;}
  if(!confirm('Supprimer cette écriture définitivement ?'))return;
  const ecAvant=(GL[livre]||[]).find(e=>e._id===id);
  try{
    await fs.deleteDoc(fs.doc(db,'grandlivre_'+livre,id));
    GL[livre]=GL[livre].filter(e=>e._id!==id);
    renderLivre(livre);
    renderSoldes(livre);
    renderSynth();
    logModification('suppression','Écriture Grand Livre '+livre, (ecAvant?.libelle||'')+' — '+fmt(ecAvant?.montant||0)+' F');
    alert('✅ Écriture supprimée !');
  }catch(e){alert('Erreur : '+e.message);}
}

// ── EXPORT EXCEL ──────────────────────────────────────────────
// Convertit une date "AAAA-MM-JJ" (format Firebase) en texte "JJ/MM/AAAA" pour Excel
function fmtDateExcel(dateStr){
  if(!dateStr) return '';
  const parts=String(dateStr).split('-');
  if(parts.length!==3) return dateStr;
  const [y,m,d]=parts;
  return d+'/'+m+'/'+y;
}

// ── FEUILLE BUDGET (TETIBOLA) — se met à jour automatiquement ──
// Calcule le "Réalisé" en additionnant les vraies écritures du Grand
// Livre Fiangonana (grandlivre_fiang) par rubrique, à chaque export.
function buildSheetBudget(){
  const rows=[['🎯 SUIVI BUDGET 2026 (TETIBOLA) — mis à jour au '+fmtDateExcel(new Date().toISOString().slice(0,10))],[],
    ['Code','Libellé','Budget 2026','Réalisé','Écart','%']];

  function realise(code, sensAttendu){
    let tot=0;
    (GL['fiang']||[]).forEach(function(e){
      if(e.rubrique===code && e.es===sensAttendu) tot+=e.montant||0;
    });
    return tot;
  }

  let totBudgetE=0,totRealiseE=0,totBudgetS=0,totRealiseS=0;

  rows.push(['MIDITRA (Entrées)','','','','','']);
  Object.keys(BUDGET_2026_ENTREES).forEach(function(code){
    const info=BUDGET_2026_ENTREES[code];
    const r=realise(code,'E');
    const ecart=info.budget-r;
    const pct=info.budget?Math.round((r/info.budget)*100):(r>0?'—':0);
    totBudgetE+=info.budget; totRealiseE+=r;
    rows.push([code,info.libelle,info.budget,r,ecart,pct===0?0:(pct+'%')]);
  });
  rows.push(['B','TOTALY MIDITRA',totBudgetE,totRealiseE,totBudgetE-totRealiseE,
    totBudgetE?Math.round((totRealiseE/totBudgetE)*100)+'%':'']);
  rows.push([],[]);

  rows.push(['MIVOAKA (Dépenses)','','','','','']);
  Object.keys(BUDGET_2026_DEPENSES).forEach(function(code){
    const info=BUDGET_2026_DEPENSES[code];
    const r=realise(code,'S');
    const ecart=info.budget-r;
    const pct=info.budget?Math.round((r/info.budget)*100):(r>0?'—':0);
    totBudgetS+=info.budget; totRealiseS+=r;
    rows.push([code,info.libelle,info.budget,r,ecart,pct===0?0:(pct+'%')]);
  });
  rows.push(['C','TOTALY MIVOAKA',totBudgetS,totRealiseS,totBudgetS-totRealiseS,
    totBudgetS?Math.round((totRealiseS/totBudgetS)*100)+'%':'']);
  rows.push([]);
  rows.push(['','SOLDE (Entrées − Dépenses)',totBudgetE-totBudgetS,totRealiseE-totRealiseS,'','']);

  return rows;
}

function buildSheetRakitra(){
  const initC=parseFloat(document.getElementById('fiang-init-caisse')?.value)||0;
  const rows=[['N°','Date','Page','E/S','Rubriques Budget','Libellé','Commentaires','Entrée','Sortie','Solde']];
  rows.push(['',fmtDateExcel('2026-07-01'),'','','','Solde initial','','',initC,initC]);
  let solde=initC;
  (GL['fiang']||[]).filter(e=>(e.source||'caisse')==='caisse').forEach(function(e){
    const mnt=e.montant||0;const isE=e.es==='E';
    solde+=isE?mnt:-mnt;
    rows.push([e.numero||'',fmtDateExcel(e.date),e.page||'',e.es,e.rubrique||'',e.libelle||'',e.comment||'',isE?mnt:'',isE?'':mnt,solde]);
  });
  return rows;
}

function buildSheetBanqueRakitra(){
  const initB=parseFloat(document.getElementById('fiang-init-banque')?.value)||0;
  const rows=[['N°','Date','Libellé','Rubrique budget','Débit','Crédit','Solde']];
  rows.push(['',fmtDateExcel('2026-07-01'),'Solde initial','','','',initB]);
  let solde=initB;
  (GL['fiang']||[]).filter(e=>(e.source||'caisse')==='banque').forEach(function(e){
    const mnt=e.montant||0;const isE=e.es==='E';
    solde+=isE?mnt:-mnt;
    rows.push([e.numero||'',fmtDateExcel(e.date),e.libelle||'',e.rubrique||'',isE?'':mnt,isE?mnt:'',solde]);
  });
  return rows;
}

function buildSheetAnjarako(){
  const initC=parseFloat(document.getElementById('anj-init-caisse')?.value)||0;
  const initB=parseFloat(document.getElementById('anj-init-banque')?.value)||0;
  const rows=[['N°','Date','Page','Libellé','Entrée','Sortie','Solde']];
  rows.push(['',fmtDateExcel('2026-07-01'),'','Solde initial caisse+banque',initC+initB,'',initC+initB]);
  let solde=initC+initB;
  (GL['anj']||[]).forEach(function(e){
    const mnt=e.montant||0;const isE=e.es==='E';
    solde+=isE?mnt:-mnt;
    rows.push([e.numero||'',fmtDateExcel(e.date),e.page||'',e.libelle||'',isE?mnt:'',isE?'':mnt,solde]);
  });
  return rows;
}

function buildSheetBanqueAnjarako(){
  const initB=parseFloat(document.getElementById('anj-init-banque')?.value)||0;
  const rows=[['N°','Date','Libellé','Rubrique budget','Débit','Crédit','Solde']];
  rows.push(['',fmtDateExcel('2026-07-01'),'Solde initial','','','',initB]);
  let solde=initB;
  (GL['anj']||[]).filter(e=>(e.source||'caisse')==='banque').forEach(function(e){
    const mnt=e.montant||0;const isE=e.es==='E';
    solde+=isE?mnt:-mnt;
    rows.push([e.numero||'',fmtDateExcel(e.date),e.libelle||'',e.rubrique||'',isE?'':mnt,isE?mnt:'',solde]);
  });
  return rows;
}

// Grand Livre K45 (hors budget Fiangonana — Caisse)
function buildSheetK45(){
  const initC=parseFloat(document.getElementById('k45-init-caisse')?.value)||0;
  const rows=[['N°','Date','Page','E/S','Libellé','Rubrique','Entrée','Sortie','Solde']];
  rows.push(['',fmtDateExcel('2026-07-01'),'','','Solde initial','','',initC,initC]);
  let solde=initC;
  (GL['k45']||[]).filter(e=>(e.source||'caisse')==='caisse').forEach(function(e){
    const mnt=e.montant||0;const isE=e.es==='E';
    solde+=isE?mnt:-mnt;
    rows.push([e.numero||'',fmtDateExcel(e.date),e.page||'',e.es,e.libelle||'',e.rubrique||'',isE?mnt:'',isE?'':mnt,solde]);
  });
  return rows;
}
// Grand Livre K45 — Banque (SIB)
function buildSheetBanqueK45(){
  const initB=parseFloat(document.getElementById('k45-init-banque')?.value)||0;
  const rows=[['N°','Date','Libellé','Rubrique','Débit','Crédit','Solde']];
  rows.push(['',fmtDateExcel('2026-07-01'),'Solde initial','','','',initB]);
  let solde=initB;
  (GL['k45']||[]).filter(e=>(e.source||'caisse')==='banque').forEach(function(e){
    const mnt=e.montant||0;const isE=e.es==='E';
    solde+=isE?mnt:-mnt;
    rows.push([e.numero||'',fmtDateExcel(e.date),e.libelle||'',e.rubrique||'',isE?'':mnt,isE?mnt:'',solde]);
  });
  return rows;
}

function exporterExcel(livre){
  const wb=XLSX.utils.book_new();
  if(livre==='fiang'){
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBudget()),'Budget 2026');
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetRakitra()),'Rakitra');
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBanqueRakitra()),'Banque Rakitra');
    if((GL['k45']||[]).length){XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetK45()),'K45 Caisse');XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBanqueK45()),'K45 Banque');}
  } else {
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetAnjarako()),'Anjarako');
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBanqueAnjarako()),'Banque Anjarako');
  }
  XLSX.writeFile(wb,'FKMA_GrandLivre_'+(livre==='fiang'?'Fiangonana':'Anjarako')+'_2026.xlsx');
}

function exporterExcelComplet(){
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBudget()),'Budget 2026');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetRakitra()),'Rakitra');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBanqueRakitra()),'Banque Rakitra');
  if((GL['k45']||[]).length){XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetK45()),'K45 Caisse');XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBanqueK45()),'K45 Banque');}
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetAnjarako()),'Anjarako');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(buildSheetBanqueAnjarako()),'Banque Anjarako');
  XLSX.writeFile(wb,'FKMA_GrandLivre_Complet_2026.xlsx');
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  ['tr-date','ob-date','rp-date'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.valueAsDate=new Date();
  });
});


// Timeout Firebase — afficher erreur si pas connecté après 10s
setTimeout(function(){
  if(!window._fbReady){
    const fbTxt=document.getElementById('fb-txt');
    if(fbTxt) fbTxt.textContent='⚠️ Connexion lente — vérifier internet';
    const loginBtn=document.getElementById('login-btn');
    if(loginBtn){loginBtn.disabled=false;loginBtn.textContent='Se connecter';}
  }
}, 10000);
