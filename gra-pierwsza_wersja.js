let plansza = document.getElementById("plansza") // pobieranie elementu canvas z html
let ctx = plansza.getContext("2d") // pobranie narzedzia do rysowania - framework canvas

let polozenie_gracza = 170 // pozycja gracza na osi OX
let szerokosc_gracza = 60 // szerokość prostokąta gracza (pontonu)

let polozenie_obiektu_x = Math.floor(Math.random() * 380) // pozycja obiektu do zlapania, x jest losowe, 380 - (obiekt - 400, obiekt 20)
let polozenie_obiektu_y = 0 // współrzędna zaczyna się od 0 - góry obiektu z html

let wynik = 0 // ustalenie wyniku gracza, do ktorego bedziemy dodawac zdobywane punkty

let szybkosc_obiektu = 5 // te dwie zmienne beda potrzebne do pozniejszej czesci programu - do check-pointow
let kolor_obiektu = "red"

let rysuj_gracza = () => { // utworzenie gracza (pontonu) 
    ctx.fillStyle = "cyan"
    ctx.fillRect(polozenie_gracza, 460, szerokosc_gracza, 20) // x,y,szerokosc i wysokosc w ktorej gracz (ponton) sie porusza
}

let sterowanie = (event) => { // funkcja sterująca, reagująca na klawisze funkcyjne
    if(event.key == "ArrowLeft"){ // jesli wcisniety klawisz strzalki w lewo
        polozenie_gracza = polozenie_gracza - 15 // przesuniecie gracza w lewo
    }

    if(event.key == "ArrowRight"){ // jesli wcisniety klawisz strzalki w prawo
        polozenie_gracza = polozenie_gracza + 15 // przesuniecie gracza w prawo
    }

    if(polozenie_gracza < 0){ // uniemozliwienie wyjscia poza plansze z lewej strony obiektu
        polozenie_gracza = 0
    }

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
let rysuj_obiekt = () => { //utworzenie spadajacego obiektu 
    ctx.fillStyle = kolor_obiektu // zmiana kolorow na check-pointach
    ctx.fillRect(polozenie_obiektu_x, polozenie_obiektu_y, 20, 20)
    polozenie_obiektu_y = polozenie_obiektu_y + szybkosc_obiektu // zmienna przyspieszającej ruch
}


let sprawdz_zlapane = () => { // funkcja sprawdzająca zlapanie obiektu przez gracza
    if(
        polozenie_obiektu_y >= 440 && 
        polozenie_obiektu_x >= polozenie_gracza &&
        polozenie_obiektu_x <= polozenie_gracza + szerokosc_gracza
    ){
        wynik = wynik + 1 // w przypadku zlapanego obiektu - dodanie punktu do lacznego wyniku gracza 
        document.getElementById("wynik").innerHTML = wynik // wyswietlenie wyniku w html

        polozenie_obiektu_y = 0 // reset pozycji obiektu i tworzenie nowego poprzez nową współrzędną, analog tego co wyzej
        polozenie_obiektu_x = Math.floor(Math.random() * 380)
    }

    if(polozenie_obiektu_y > plansza.height){ // if do sprawdzenia, czy obiekt spadł poza planszę, czyli nie został złapany
        polozenie_obiektu_y = 0 // reset pozycji
        polozenie_obiektu_x = Math.floor(Math.random() * 380) // tworzenie nowego obiektu poprzez nową wspolrzedna, znowu analog
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
if(wynik >= 25 && wynik < 50){
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

let gra = () => { // funkcja uruchamiająca gre
    ctx.clearRect(0, 0, plansza.width, plansza.height) // czyszczenie planszy

    rysuj_gracza() // wywolanie funkcji tworzącej gracza (ponton)
    rysuj_obiekt() // wywolanie funkcji tworzącej spadające obiekty
    sprawdz_zlapane() // wywolanie funkcji sprawdzajacej zlapane i niezlapane obiekty - dodawanie punktow do wyniku
}

setInterval(gra, 30) // interwal, uruchomienie gry w petli 30ms
