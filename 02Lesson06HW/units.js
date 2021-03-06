var JsonExport = {
        'black': {
            'pawn': {
                'unitClass': 'glyphicon-pawn',
                'startLocation': ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
            },
            'tower': {
                'unitClass': 'glyphicon-tower',
                'startLocation': ['A8', 'H8'],
            },
            'knight': {
                'unitClass': 'glyphicon-knight',
                'startLocation': ['B8', 'G8'],
            },
            'bishop': {
                'unitClass': 'glyphicon-bishop',
                'startLocation': ['C8', 'F8'],
            },
            'queen': {
                'unitClass': 'glyphicon-queen',
                'startLocation': ['D8'],
            },
            'king': {
                'unitClass': 'glyphicon-king',
                'startLocation': ['E8'],
            },
        },

        'white': {
            'pawn': {
                'unitClass': 'glyphicon-pawn',
                'startLocation': ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
            },
            'tower': {
                'unitClass': 'glyphicon-tower',
                'startLocation': ['A1', 'H1'],
            },
            'knight': {
                'unitClass': 'glyphicon-knight',
                'startLocation': ['B1', 'G1'],
            },
            'bishop': {
                'unitClass': 'glyphicon-bishop',
                'startLocation': ['C1', 'F1'],
            },
            'queen': {
                'unitClass': 'glyphicon-queen',
                'startLocation': ['D1'],
            },
            'king': {
                'unitClass': 'glyphicon-king',
                'startLocation': ['E1'],
            },
        }
    };

//Get the file contents
console.log(JSON.stringify(JsonExport));
//
// //Save the file contents as a DataURI
// var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(str);
//
// window.open(dataUri, '_blank');
// window.focus();
