'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.TASKCONSTANTS
 * @description
 * # TASKCONSTANTS
 * Mock module for tasks
 */
angular.module('workmanagerFrontendApp')
    .constant('TASKCONSTANTS', {
        priorities: [
            {id: 0, 'name': 'Najniższy'},
            {id: 1, 'name': 'Niski'},
            {id: 2, 'name': 'Średni'},
            {id: 3, 'name': 'Wysoki'},
            {id: 4, 'name': 'Bardzo wysoki'},
            {id: 5, 'name': 'Krytyczny'},
        ],
        types: [
            {id: 0, 'name': 'Zadanie'},
            {id: 2, 'name': 'Błąd'},
            {id: 3, 'name': 'Sugestia'},
            {id: 4, 'name': 'Kosmetyka '},
            {id: 5, 'name': 'Wydajnsoć'},
        ],
        states: [
            {id: 1, 'name': 'Zgłoszone'},
            {id: 2, 'name': 'W toku'},
            {id: 3, 'name': 'Rozwiązane'},
            {id: 4, 'name': 'Zamknięte'},
            {id: 5, 'name': 'Odrzucone'},
            {id: 6, 'name': 'Niewystarczająca ilosc informacji'},
            {id: 7, 'name': 'Zweryfikowane '}
        ]
    });
