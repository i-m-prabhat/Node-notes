[
    {
        '$match': {
            'isActive': true
        }
    }, {
        '$count': 'activeUsers'
    }
]