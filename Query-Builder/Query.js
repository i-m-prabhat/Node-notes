"use strict";

function insert(tablename,dataObject){
    if (insert=='') {
        console.log('Tablename is Required');
    }

    let sql = "";
    let columnArr = Object.keys(dataObject);
    let valuesArr = Object.values(dataObject);
    let column_str = columnArr.join(",");
    let values_str = valuesArr.join("','");
    sql = sql + `INSERT INTO ${tablename} (${column_str}) values('${values_str}')`;
    console.log(sql);
}

// insert('student',{
//     'name':"prabhat",
//     'class':'Diploma',
//     'marks':'70',
// });

// insert('user',{
//     'name':"prabhat",
//     'type':'admin',
//     'proxcy':'100',
//     'title': 'hacker',
//     'gf': 'NAN'
// });



function deleteRecord(tablename,param){
    let sql="";
    let pk = Object.keys(param); //key-1 ['std_id']
    let pk_values = Object.values(param); //1,2,3,4,5,6,..
    let pk_str = pk_values.join("','");

    sql = sql + `DELETE FROM ${tablename} where ${pk[0]} in ('${pk_str}')`;
    console.log(sql);
}

// deleteRecord('student',{
//     'std_id': [1,2,3,4,5,6,7,9]
// });

// deleteRecord('user',{
//     'id':[1001]
// })

// deleteRecord('order',{
//     'order_id':['ord_1002154586']
// })


UpdateRecord('student',{
    'name':'sumit',
    'class':'12th',
    'marks':50,
},{
    'id':">='1' OR",
    'mobile':"='9000000001'"
})






















