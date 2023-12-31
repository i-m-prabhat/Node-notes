[
    {
        $group: {
            // _id: "$gender",
            // _id: "$age",
            _id: null,
            averageAge: {
                $avg: "$age"
            }
        }
    }
]