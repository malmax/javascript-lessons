var elemChessTypes = {
    'black': {
        'pawn': {
            'icon': '<span class="glyphicon glyphicon-pawn black" aria-hidden="true"></span>',
            'startLocation': ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
        },
        'tower': {
            'icon': '<span class="glyphicon glyphicon-tower black" aria-hidden="true"></span>',
            'startLocation': ['A8', 'H8'],
        },
        'knight': {
            'icon': '<span class="glyphicon glyphicon-knight black" aria-hidden="true"></span>',
            'startLocation': ['B8', 'G8'],
        },
        'bishop': {
            'icon': '<span class="glyphicon glyphicon-bishop black" aria-hidden="true"></span>',
            'startLocation': ['C8', 'F8'],
        },
        'queen': {
            'icon': '<span class="glyphicon glyphicon-queen black" aria-hidden="true"></span>',
            'startLocation': ['D8'],
        },
        'king': {
            'icon': '<span class="glyphicon glyphicon-king black" aria-hidden="true"></span>',
            'startLocation': ['E8'],
        },
    },
    'white': {
        'pawn': {
            'icon': '<span class="glyphicon glyphicon-pawn white" aria-hidden="true"></span>',
            'startLocation': ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
        },
        'tower': {
            'icon': '<span class="glyphicon glyphicon-tower white" aria-hidden="true"></span>',
            'startLocation': ['A1', 'H1'],
        },
        'knight': {
            'icon': '<span class="glyphicon glyphicon-knight white" aria-hidden="true"></span>',
            'startLocation': ['B1', 'G1'],
        },
        'bishop': {
            'icon': '<span class="glyphicon glyphicon-bishop white" aria-hidden="true"></span>',
            'startLocation': ['C1', 'F1'],
        },
        'queen': {
            'icon': '<span class="glyphicon glyphicon-queen white" aria-hidden="true"></span>',
            'startLocation': ['D1'],
        },
        'king': {
            'icon': '<span class="glyphicon glyphicon-king white" aria-hidden="true"></span>',
            'startLocation': ['E1'],
        },
    }

};

JSON.stringify(elemChessTypes);
