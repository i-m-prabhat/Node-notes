# Mongodb Aggregation Pipeline

## Questions

1. How many users are active.

```
[
    {
        '$match': {
            'isActive': true
        }
    }, {
        '$count': 'activeUsers'
    }
]
```

2. What is the average age of all users?

```
[
  {
    $group: {
      // _id: "$gender",
      // _id: "$age",
      _id: null,
      averageAge:{
        $avg:"$age"
      }     
    }
  }
]
```

3. Which user has the highest number of friends?
