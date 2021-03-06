//
let  eltMyBooks = document.getElementById("myBooks");
let eltContent = document.getElementById("content");
const eltH2 = document.getElementsByClassName("h2");
let eltHR = document.getElementsByTagName("hr");
let libelleAlert = "";
/* Chargement d'une forme vide pour saisie de la recherche*/
let eltDivForms1 = document.createElement("div");
eltH2[0].appendChild(eltDivForms1)
let eltFormsVide = document.createElement("forms");
eltFormsVide.setAttribute("id","FormsVide");
eltFormsVide.setAttribute("class", "forms1");
eltDivForms1.appendChild(eltFormsVide);
	
/* Chargement d'une forme vide pour restitution de la recherche */
let eltSectionResultat = document.createElement("section");
eltHR[0].insertAdjacentElement('beforebegin', eltSectionResultat);
eltSectionResultat.id = "sectionResultat";


let eltForms2Vide = document.createElement("forms");
eltForms2Vide.setAttribute("id","forms2Vide");
eltForms2Vide.setAttribute("class", "forms2");
eltSectionResultat.appendChild(eltForms2Vide);



let eltSectionPochList = document.createElement("section");
eltContent.appendChild(eltSectionPochList);
eltSectionPochList.id = "sectionPochList";
eltContent.appendChild(eltSectionPochList);
let eltForms3Vide = document.createElement("forms");
eltForms3Vide.setAttribute("id","forms3Vide");
eltForms3Vide.setAttribute("class", "forms3");
eltSectionPochList.appendChild(eltForms3Vide);	
addBookButton();
ChargementPochList();


function addBookButton(){
	
	let eltForms = document.createElement("forms");
	eltForms.setAttribute("id","FormsNouveauLivre");
	eltForms.setAttribute("class","forms1");
	
	const oldEltForms = document.getElementsByClassName("forms1");
	eltDivForms1.replaceChild(eltForms, oldEltForms[0]);
	eltForms.innerHTML = '<input type="button" id="ajoutLivre" value="Ajouter un livre">';
	console.log(eltMyBooks);
	buttonAddLivre=document.getElementById("ajoutLivre");
	buttonAddLivre.addEventListener('click',function(event){
		event.preventDefault();
		EcranSaisie();
		console.log(eltMyBooks);
	}, false);
}


function clickAjoutLivre(){
	preventDefault();
	EcranSaisie();
	console.log(eltMyBooks);
}


function EcranSaisie(){
	let formsSearchLivre = document.createElement("forms");
	
	formsSearchLivre.id = "formsSearchLivre";
	formsSearchLivre.setAttribute("class","forms1");
	let divSearchLivre = document.createElement("div");
	divSearchLivre.id = "blockfields";
	formsSearchLivre.appendChild(divSearchLivre);
	let eltLabelTitre = document.createElement("label");
	eltLabelTitre.setAttribute("for","TitreLivre");
	eltLabelTitre.innerHTML="Titre du Livre   ";
	divSearchLivre.appendChild(eltLabelTitre);

	let eltInputTitre = document.createElement("Input");
	eltInputTitre.id="titreLivre";
	eltInputTitre.setAttribute("type","textarea");
	
	divSearchLivre.appendChild(eltInputTitre);

	let eltLabelAuteur = document.createElement("label");
	eltLabelAuteur.setAttribute("for","AuteurLivre");
	eltLabelAuteur.innerHTML="Auteur        ";
	divSearchLivre.appendChild(eltLabelAuteur);

	let eltInputAuteur = document.createElement("Input");
	eltInputAuteur.setAttribute("id","AuteurLivre");
	eltInputAuteur.setAttribute("type","textarea");

	divSearchLivre.appendChild(eltInputAuteur);

	let divButtonSearch = document.createElement("div");
	divButtonSearch.id="divButtonSearch";
	formsSearchLivre.appendChild(divButtonSearch);
	let eltButtonRechercher = document.createElement("input");
	eltButtonRechercher.setAttribute("type","button");
	eltButtonRechercher.setAttribute("id","RechercheButton");
	eltButtonRechercher.setAttribute("value","Rechercher");	
	divButtonSearch.appendChild(eltButtonRechercher);

	let eltButtonAnnuler = document.createElement("input");
	eltButtonAnnuler.setAttribute("type","button");
	eltButtonAnnuler.setAttribute("id","AnnulerButton");
	eltButtonAnnuler.setAttribute("value","Annuler");
	divButtonSearch.appendChild(eltButtonAnnuler);

	
	const oldEltForms = document.getElementsByClassName("forms1");
	eltDivForms1.replaceChild(formsSearchLivre,oldEltForms[0]);

	eltButtonAnnuler.addEventListener('click',function(event){
		event.preventDefault();
		addBookButton();
		let oldForms2 = document.getElementsByClassName("forms2");
		eltSectionResultat.replaceChild(eltForms2Vide,oldForms2[0]);
	}, false);

	eltButtonRechercher.addEventListener('click',function(event){
		event.preventDefault();
		if (document.getElementById("titreLivre").value == "") {
			libelleAlert = "Vous devez saisir obligatoirement le titre ";
		}	
		if (document.getElementById("AuteurLivre").value == "") {
			libelleAlert="Vous devez saisir obligatoirement l'auteur ";	
		}
		if (libelleAlert != "") {
			alert(libelleAlert);
			libelleAlert="";
		}
		else {
			recherche_web();
		}
	}, false);
}
function recherche_web() {
	let rechTitreLivre = document.getElementById("titreLivre").value;
	let rechAuteur = document.getElementById("AuteurLivre").value;

	var request = new XMLHttpRequest();
	const lineRequete = "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ rechTitreLivre +"+inauthor:"+ rechAuteur+"&KEY=AIzaSyBNkiAtCLMEPYQIBOoOiEr1f1BLQcjZGlo";
	console.log(lineRequete);
	request.open("GET", lineRequete);	
	request.send();	
	
	request.onreadystatechange = function() {
    	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			let response = JSON.parse(this.responseText);
			console.log(response);
			
			let eltForms2Resultat = document.createElement("forms");
			
			eltForms2Resultat.setAttribute("id","forms2resultat");
			eltForms2Resultat.setAttribute("class", "forms2");
			eltForms2Resultat.innerHTML = "<h2>Résultat de la recherche</h2>";
			if (response.totalItems != "0") {
				let eltListeResultat = document.createElement('div');
				eltListeResultat.id = "bookList";
				
				eltForms2Resultat.appendChild(eltListeResultat);
			
				for (let livre of response.items) {   
					
					let newDiv = document.createElement('div');
					newDiv.classList.add('bookItem');
					newDiv.id = livre.id + "[Res]";

					let eltHeaderSection = document.createElement("div");
					eltHeaderSection.setAttribute("class","headerSection");
					newDiv.appendChild(eltHeaderSection);
					
					let newBookmark = document.createElement("i");
					newBookmark.setAttribute("class", "far fa-bookmark");
					newBookmark.setAttribute("title", "Ajouter ce livre dans ma poch'list");
					newBookmark.setAttribute("aria-hidden", "true");
					
					/* Définition du traitement en cas de click sur bookmark */

					newBookmark.addEventListener('click',function(event){
						event.preventDefault();
						eltParentSelection = newBookmark.parentElement;
						console.log(newIdLivre);
						console.log("Parent Selection Bookmark  :",eltParentSelection);
					
						AjoutPochlist(livre);
						console.log(newBookmark);
						/* changement color bookmark */
						newBookmark.style.backgroundColor = "#519caf";
						ChargementPochList();
					}, false);
					let eltSpanResult = document.createElement('span');
					eltSpanResult.setAttribute("class","sr-only");
					eltSpanResult.innerText = "Ajouter de livre dans ma poch'list";
					eltHeaderSection.appendChild(eltSpanResult);

					let newTitle = document.createElement('p');
					if ( livre.volumeInfo["title"].length > 84) {
						newTitle.innerHTML = "Titre : <strong>" + livre.volumeInfo["title"].substring(0,84)+"[...]</strong>";
					} else {
						newTitle.innerHTML = "Titre : <strong>" + livre.volumeInfo["title"]+"</strong>";
					}
					let newIdLivre= document.createElement('p');
					newIdLivre.innerHTML = "Id : " + livre.id;
					
					let newAuteur = document.createElement('p');
					const listAuteur = livre.volumeInfo["authors"];
					
					newAuteur.innerHTML = "Auteur : <strong>" + livre.volumeInfo.authors[0]+"</strong>";
					console.log(response);
					let newDescription = document.createElement('p');
					newDescription.setAttribute("class","bookDescription");
					if (typeof(livre.volumeInfo["description"]) != "undefined") {
				        if (livre.volumeInfo["description"].length > 200) {
					        newDescription.innerHTML = "<br>Description : " + livre.volumeInfo["description"].substring(0,199) + " [...]";
					    }
                        else {
						newDescription.innerHTML = "<br>Description : " + livre.volumeInfo["description"].substring(0,199);
						}
					}
					else {
						newDescription.innerHTML = "<br>Description : Information manquante";	
					}
					eltHeaderSection.appendChild(newBookmark);
					eltHeaderSection.appendChild(newTitle);
					newDiv.appendChild(newIdLivre);
					newDiv.appendChild(newAuteur);
					newDiv.append(newDescription);
					eltMyBooks.append(newDiv);
					let eltCouvertureLivre = document.createElement("p");
					eltCouvertureLivre.setAttribute("class","couvertureLivre");
					newDiv.appendChild(eltCouvertureLivre);
					let newImageLivre = document.createElement('img');
					newImageLivre.setAttribute("id","photolivre");
					let imageLivre = "img\\unavailable.png";
					/* Chargement d'une forme vide pour saisie de la recherche*/
					
					if (typeof(livre.volumeInfo["imageLinks"]) != "undefined") {
						
						imageLivre = livre.volumeInfo["imageLinks"].smallThumbnail;
					}
					else {
						newImageLivre.setAttribute("height","200");
						newImageLivre.setAttribute("width","150");
					}
					newImageLivre.setAttribute("src",imageLivre);
					eltCouvertureLivre.appendChild(newImageLivre);

					eltListeResultat.appendChild(newDiv);
				}				
			}
			else {
				/* Affichage de "Aucun Livre" */
				let eltAucunResultat = document.createElement("div");
				eltForms2Resultat.setAttribute("id", "aucunlivre");
				eltForms2Resultat.innerHTML="<h3>Aucun livre n'a été trouvé</h3>";
			}
			const oldForms2 = document.getElementsByClassName("forms2");
			console.log(oldForms2[0]);
			eltSectionResultat.replaceChild(eltForms2Resultat, oldForms2[0]);
			console.log(eltMyBooks);
		}
	};	
}
function AjoutPochlist(livre) {	
	if (sessionStorage.getItem(livre.id) != null) {
		alert("Vous ne pouvez pas sélectionner ce livre  '" + livre.volumeInfo["title"] + "' déjà dans votre Poch'List");
	}
	else {
		console.log(sessionStorage.getItem(livre.id));
		sessionStorage.setItem(livre.id,JSON.stringify(livre));
		alert("Le livre '"+ livre.volumeInfo["title"]+ "' de " + livre.volumeInfo.authors[0] + " a été ajouté dans votre Poch'Liste");
		ChargementPochList();
		console.log("chargement POCHLIST");
	}
}
	
function ChargementPochList() {
	let eltForms3PochList = document.createElement("forms");
	let livre="";	
	let eltASupprimer;
	eltForms3PochList.setAttribute("id","forms3PochList");
	eltForms3PochList.setAttribute("class", "forms3");

	if (sessionStorage.length != null ) {
		let eltListePochList = document.createElement('div');
		eltListePochList.id = "bookList";
		
		eltForms3PochList.appendChild(eltListePochList);

		for (i=0; i < sessionStorage.length;i++) {
			const idLivre = sessionStorage.key(i);
			console.log("Clé du livre" + idLivre);
			livre = JSON.parse(sessionStorage.getItem(idLivre));
		
			let divPochList = document.createElement('div');
			divPochList.classList.add('bookItem');
			divPochList.id = livre.id + "[Poch]";

			let eltHeaderSection = document.createElement("div");
			eltHeaderSection.setAttribute("class","headerSection");
			divPochList.appendChild(eltHeaderSection);
		
			let newDeleteIcon = document.createElement("i");
			newDeleteIcon.setAttribute("class", "far fa-trash-alt icon-2x");
			newDeleteIcon.setAttribute("title", "Supprimer ce livre dans ma poch'list");
			newDeleteIcon.setAttribute("aria-hidden", "true");
		
			/* Cas du click sur bouton supprimer livre dans PochList */
			newDeleteIcon.addEventListener('click',function(event){
				event.preventDefault();
			
				sessionStorage.removeItem(idLivre);
			
				eltASupprimer = document.getElementById(idLivre + "[Poch]");
				eltASupprimer.remove();		
			}, false);

			let eltSpanPochList = document.createElement('span');
			eltSpanPochList.setAttribute("class","sr-only");
			eltSpanPochList.innerText = "Ajouter de livre dans ma poch'list";
			eltHeaderSection.appendChild(eltSpanPochList);
			let newTitle = document.createElement('p');
			if ( livre.volumeInfo["title"].length > 84) {
				newTitle.innerHTML = "Titre : <strong>" + livre.volumeInfo["title"].substring(0,84)+"[...]</strong>";
			} else {
				newTitle.innerHTML = "Titre : <strong>" + livre.volumeInfo["title"]+"</strong>";
			}
			let newIdLivre= document.createElement('p');
			newIdLivre.innerHTML = "Id : " + livre.id;
		
			let newAuteur = document.createElement('p');
			const listAuteur = livre.volumeInfo["authors"];
			newAuteur.innerHTML = "Auteur : <strong>" + livre.volumeInfo.authors[0]+"</strong>";
		
			let newDescription = document.createElement('p');
			newDescription.setAttribute("class","bookDescription");
			if (typeof(livre.volumeInfo["description"]) != "undefined") {
				if (livre.volumeInfo["description"].length > 200) {
					newDescription.innerHTML = "<br>Description : " + livre.volumeInfo["description"].substring(0,199) + " [...]";
				}
				else {
					newDescription.innerHTML = "<br>Description : " + livre.volumeInfo["description"].substring(0,199);
				}
			}
			else {
				newDescription.innerHTML = "<br>Description : Information manquante";	
			}
			eltHeaderSection.appendChild(newDeleteIcon);
			eltHeaderSection.appendChild(newTitle);
			divPochList.appendChild(newIdLivre);
			divPochList.appendChild(newAuteur);
			divPochList.appendChild(newDescription);
			eltForms3PochList.appendChild(divPochList);
			let eltCouvertureLivre = document.createElement("p");
			eltCouvertureLivre.setAttribute("class","couvertureLivre");
			divPochList.appendChild(eltCouvertureLivre);
			let newImageLivre = document.createElement('img');
			newImageLivre.setAttribute("id","photolivre");
			let imageLivre = "img\\unavailable.png";
					
			if (typeof(livre.volumeInfo["imageLinks"]) != "undefined") {						
				imageLivre = livre.volumeInfo["imageLinks"].smallThumbnail;
			}
			else {
				newImageLivre.setAttribute("height","200");
				newImageLivre.setAttribute("width","150");
			}
			newImageLivre.setAttribute("src",imageLivre);
			eltCouvertureLivre.appendChild(newImageLivre);

			eltListePochList.appendChild(divPochList);
		}
	}				

	const oldForms2 = document.getElementsByClassName("forms2");
	let newTitle1 = document.createElement('p');					
	const oldForms3 = document.getElementsByClassName("forms3");
	console.log(oldForms3[0]);
	eltSectionPochList.replaceChild(eltForms3PochList, oldForms3[0]);

}