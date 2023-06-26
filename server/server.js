require('dotenv').config();
const express = require('express');
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());

app.use(express.json());

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        const results = await db.query("SELECT * FROM restaurant");
        res.status(200).json({ 
            status: "Success",
            results: results.rows.length,
            data: {
                 restaurants: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const restaurant = await db.query(`SELECT * FROM restaurant WHERE id = $1`, [req.params.id]);

        const reviews = await db.query(`SELECT * FROM reviews WHERE restaurant_id = $1`, [req.params.id]);
        res.status(200).json({
            status: "succes",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {

    try{
        const results = await db.query(`INSERT INTO restaurant (name, location, price_range) VALUES ($1, $2, $3) returning *`, [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: "succes",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Update Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {

    try{
        const results = await db.query(`UPDATE restaurant 
                                                        SET 
                                                        name = $1, 
                                                        location = $2, 
                                                        price_range = $3 
                                                        WHERE id = $4
                                                        returning *`,
                                                        [req.body.name, req.body.location, req.body.price_range, req.params.id]);
    
        res.status(200).json({
            status: "succes",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    };
});

// Delete Restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query(`DELETE FROM restaurant 
                                                        WHERE id = $1`, [req.params.id])
        res.status(204).json({
            status: "succes",
        });
    } catch (err) {
        console.log(err);
    }
});


// Add Review

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0],
            }
        })
    } catch (err) {
        console.log(err);
    }
})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
