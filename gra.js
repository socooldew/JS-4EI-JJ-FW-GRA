let plansza = document.getElementById("plansza") // pobieranie elementu canvas z html
let ctx = plansza.getContext("2d") // pobranie narzedzia do rysowania - framework canvas

let polozenie_gracza = 170 // pozycja gracza na osi OX
let szerokosc_gracza = 60 // szerokość prostokąta gracza (koszyka)

let polozenie_obiektu_x = Math.floor(Math.random() * 380) + 10 // +10 by upewnić się, że środek jajka nie wyjdzie za lewy ekran
let polozenie_obiektu_y = 0 

let wynik = 0 
let szybkosc_obiektu = 5 
let kolor_obiektu = "gold" // zmiana początkowego koloru na złoty

// flaga informująca czy aktualnie spadające jajko jest zatrute
let czy_zatrute = false;

// wydzielilismy losowania jajka do osobnej funkcji, zeby nie powielać kodu 
let losuj_nowe_jajko = () => {
    polozenie_obiektu_y = 0 // reset pozycji Y
    polozenie_obiektu_x = Math.floor(Math.random() * 380) + 10 // nowa losowa pozycja X
    
    //losowanie szansy na zatrute jajko 0.2 to 20% szans
    if(Math.random() < 0.2) {
        czy_zatrute = true;
    } else {
        czy_zatrute = false;
    }
}

let rysuj_gracza = () => { 
    // rysowanie koszyka zamiast pontonu
    ctx.fillStyle = "saddlebrown"
    ctx.fillRect(polozenie_gracza, 460, szerokosc_gracza, 20) // podstawa koszyka (stary ponton)
    
    ctx.beginPath() // polokrag nad podstawa, aby utworzyc koszyk
    ctx.strokeStyle = "saddlebrown"
    ctx.lineWidth = 4 // grubosc uchwytu
    ctx.arc(polozenie_gracza + szerokosc_gracza / 2, 460, szerokosc_gracza / 2 - 5, Math.PI, 0) // ośrodek X, Ośrodek Y, Promień, Start kąta, Koniec kąta
    ctx.stroke() // obrys linii
}

let sterowanie = (event) => { // funkcja sterująca, reagująca na klawisze funkcyjne
    if(event.key == "ArrowLeft")
        { polozenie_gracza = polozenie_gracza - 15} // jesli wcisniety klawisz strzalki w lewo
    if(event.key == "ArrowRight"){ 
        polozenie_gracza = polozenie_gracza + 15 
        } // przesuniecie gracza w lewo

    if(polozenie_gracza < 0){
        polozenie_gracza = 0 
    } // uniemozliwienie wyjscia poza plansze z lewej strony obiektu
    if(polozenie_gracza > plansza.width - szerokosc_gracza){ // uniemozliwienie wyjscia poza plansze z prawej strony obiektu
        polozenie_gracza = plansza.width - szerokosc_gracza 
    }
}

document.addEventListener("keydown", sterowanie) // zdarzenie wykrywające nacisniety klawisz, w efekcie aktywuje funkcje "sterowanie"

/*let rysuj_obiekt = () => { // utworzenie spadającego obiektu
    ctx.fillStyle = "red"
    ctx.fillRect(polozenie_obiektu_x, polozenie_obiektu_y, 20, 20) // x,y,szerokosc,wysokosc
    polozenie_obiektu_y = polozenie_obiektu_y + 5 // spada w dół, wiec zwieksza sie y
}
*/

let rysuj_obiekt = () => { // funkcja strzalkowa
    //ustalenie koloru na podstawie stanu jajka
    if (czy_zatrute){
        ctx.fillStyle = "lime" // zepsute jajko jest zielone
    } else {
        ctx.fillStyle = kolor_obiektu // dobre jajko przyjmuje kolor z check-pointu - nizej w kodzie
    }

    //rysowanie owalu (jajka) zamiast kwadratu (fillRect)
    ctx.beginPath();
    // wzor: ctx.ellipse(X srodka, Y srodka, promien X, promien Y, rotacja, kat poczatkowy, kat koncowy)
    ctx.ellipse(polozenie_obiektu_x, polozenie_obiektu_y, 12, 18, 0, 0, 2 * Math.PI);
    ctx.fill();

    polozenie_obiektu_y = polozenie_obiektu_y + szybkosc_obiektu // zmienna przyspieszającej ruch
}

let sprawdz_zlapane = () => { // funkcja sprawdzająca zlapanie obiektu przez gracza
    if(
        polozenie_obiektu_y >= 440 && 
        polozenie_obiektu_x >= polozenie_gracza - 10 &&
        polozenie_obiektu_x <= polozenie_gracza + szerokosc_gracza + 10
    ){
        if(czy_zatrute) { // instrucja warunkowa do sprawdzania jajka ktore zostalo zlapane
            wynik = wynik - 5 // kara za zlapanie zatrutego jajka
            if(wynik < 0) wynik = 0 // zabezpieczenie, zeby punkty nie spadly ponizej zera
        } else {
            wynik = wynik + 1 // w przypadku zlapanego zdrowego obiektu - dodanie punktu do lacznego wyniku gracza 
        }
        
        document.getElementById("wynik").innerHTML = wynik // wyswietlenie wyniku w html
        losuj_nowe_jajko() // nowa, dodana funkcja wywolana z poczatku kodu
    }

    if(polozenie_obiektu_y > plansza.height){ 
        losuj_nowe_jajko() // Jeśli spadło i nie złapaliśmy, też losujemy nowe
    }
// check-pointy - zdarzenia po osiagnieciu progow - przyspieszenie obiektow i zmiany kolorow
/*if(wynik >= 25 && wynik < 50){
        szybkosc_obiektu = 7
        kolor_obiektu = "pink"
    } else if(wynik >= 50 && wynik < 75){
        szybkosc_obiektu = 9
        kolor_obiektu = "green"
    } else if(wynik >= 75){
        szybkosc_obiektu = 12
        kolor_obiektu = "purple"
    }
}
*/
    // check-pointy poprawione
    if(wynik >= 25 && wynik < 50){
        szybkosc_obiektu = 7
        kolor_obiektu = "pink"
    } else if(wynik >= 50 && wynik < 75){
        szybkosc_obiektu = 9
        kolor_obiektu = "green"
    } else if(wynik >= 75){
        szybkosc_obiektu = 12
        kolor_obiektu = "purple"
    } else if (wynik < 25) {
        // powrót do poziomu 1, gdy przez zatrute jajka wynik spadnie poniżej 25
        szybkosc_obiektu = 5
        kolor_obiektu = "gold"
    }
}


let gra = () => {  // rozpoczecie gry, wywolanie wszystkich potrzebnych funkcji z wczesniejszych momentwo kodu
    ctx.clearRect(0, 0, plansza.width, plansza.height) // czyszczenie planszy

    rysuj_gracza() // tworzenie gracza
    rysuj_obiekt() // obiekty
    sprawdz_zlapane() // obsluga wyniku
}

// losowanie jajka zanim pętla ruszy
losuj_nowe_jajko()

setInterval(gra, 30)// interwal, uruchomienie gry w petli 30ms