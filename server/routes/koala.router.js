const { Router, response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require(`../module/pool.js`)


// GET
router.get(`/`, (req, res) => {
    console.log(`In /koala GET`);
    let sqlQuery = `
    SELECT * 
    FROM "KOALA"
        ORDER BY "ready_to_transfer" ASC`;
        pool.query(sqlQuery)
        .then ((dbRes) => {
            let koalaTableData = dbRes.rows;
            res.send(koalaTableData);
        }).catch((dbErr) => {
            res.sendStatus(500);
        });
});

// POST
router.post('/', (req,res) => {
    console.log('post/koala');
    console.log(req.body);
    let sqlQuery= `
    INSERT INTO "KOALA"
    ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES
    ($1, $2, $3, $4, $5)`
    let sqlValues = [req.body.name, req.body.gender, req.body.age, req.body.ready_to_transfer, req.body.notes];
    console.log(`Here's the values:`, sqlValues);
    pool.query(sqlQuery,sqlValues)
    .then((dbRes) => {
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.log('something broke in POST koala', dbErr);
      res.sendStatus(500)
    })
  })

// PUT
router.put (`/:id`, (req, res) => {
    let id = req.params.id;
    console.log(req.params.ready_to_transfer)
    let ready_to_transfer = req.body.ready_to_transfer;
    let sqlQuery = `
    UPDATE "KOALA"
        SET "ready_to_transfer" = $1
            WHERE "id" = $2; 
    `
    let sqlValues = [ready_to_transfer, id];

    pool.query(sqlQuery, sqlValues)
    .then ((dbRes) => {
        res.sendStatus(200);
    }).catch ((dbErr) => {
        console.log(`Error in PUT`, dbErr);
        res.sendStatus(500);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    console.log(req.params);
    let idToDelete = req.params.id;
  
    let sqlQuery = `
      DELETE FROM "koala"
        WHERE "id"=$1;        
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
      .then((dbRes) => {
        // That worked! Tell "OK" to the client:
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.log('broke in DELETE /creatures/:id', dbErr);
        res.sendStatus(500);
      })
  })

module.exports = router;