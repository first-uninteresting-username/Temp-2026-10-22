# Obywatelska. — Ja i społeczeństwo

Statyczna strona do powtórki edukacji obywatelskiej w klasie 2. Zakres odpowiada pięciu punktom podsumowania przesłanego przez użytkownika i działowi I podstawy programowej. Priorytetem są pogrubione pojęcia i ich definicje.

- **48 pojęć**, w tym **23 priorytety** z podsumowania. Krótkie definicje, rozwinięcia, przykłady i wskazówki „Uważaj na różnicę”.
- Wyszukiwanie, pięć tematów, filtr priorytetów i pojęć jeszcze nieopanowanych.
- Fiszki z odkrywaniem odpowiedzi i samooceną „Umiem”.
- **60 pytań ABCD**. Pełny test losuje **20 pytań: po 4 z każdego tematu**. Test pojedynczego tematu ma 12 pytań.
- Tryb sprawdzianu i tryb nauki, mieszanie pytań i odpowiedzi, wynik z wyjaśnieniami, osobna powtórka błędów.
- Zapis rozpoczętego testu, znanych pojęć i wyników w `localStorage` tej przeglądarki.
- Układ na telefonach: dolna nawigacja, większy tekst, przyciski wygodne w obsłudze dotykiem, jednokolumnowe karty i wsparcie bezpiecznych obszarów ekranu.
- Jasny i ciemny motyw. Domyślnie zgodny z systemem; przycisk w nagłówku pozwala przełączyć motyw i zapamiętać wybór na urządzeniu. Zmiany synchronizują się między kartami przeglądarki.
- Obsługa klawiatury, brak kont, reklam, analityki, zewnętrznych fontów i bibliotek.

## GitHub Pages — uruchomienie

1. W repozytorium otwórz **Settings → Pages**.
2. W sekcji **Build and deployment** wybierz **Source: Deploy from a branch**.
3. Wybierz **Branch: main**, folder **/ (root)** i kliknij **Save**.
4. Poczekaj na zakończenie wdrożenia. Adres strony:

   https://first-uninteresting-username.github.io/Temp-2026-10-22/

Plik `.nojekyll` pozwala publikować pliki bez przetwarzania Jekyll. Nie trzeba instalować zależności ani wykonywać kompilacji. Ścieżki względne i nawigacja oparta na fragmentach URL działają w podkatalogu repozytorium.

## Lokalnie

Otwórz `index.html` w przeglądarce lub uruchom serwer w katalogu projektu:

```sh
python3 -m http.server 8000
```

Serwer HTTP zapewnia przewidywalny zapis postępu. Pamięć `localStorage` przy otwarciu pliku `file://` zależy od przeglądarki.

## Sprawdzenie treści

Node.js 18 lub nowszy:

```sh
node --test tests/*.test.cjs
node --check assets/app.js
```

## Edycja

- `assets/data.js`: pojęcia, rozwinięcia, przykłady, priorytety oraz źródła.
- `assets/questions.js`: pula pytań; w źródle pierwsza odpowiedź jest poprawna. Aplikacja miesza kolejność odpowiedzi podczas losowania testu.
- `assets/app.js`: logika interfejsu, fiszek, testów i zapisu postępu.
- `assets/style.css`: wygląd oraz układ mobilny i do druku.
- `assets/mobile.css`: czytelny układ i nawigacja na telefonach, wielkości pól dotykowych.
- `assets/theme.js`, `assets/theme.css`: motywy, ustawienia systemowe i zapamiętywanie wyboru. Preferencja motywu używa osobnego klucza `obywatelska-theme`; czyszczenie postępu nauki jej nie usuwa.

To narzędzie do nauki, nie system egzaminacyjny. Poprawne odpowiedzi są dostępne w kodzie statycznej strony.

Zdjęcie podręcznika nie jest publikowane. Definicje są opracowane własnymi słowami; źródła i granice opracowania opisuje widok „O materiale i źródłach”. Kod podlega licencji obecnej w pliku `LICENSE` repozytorium.
