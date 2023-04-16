import React, { useEffect, useState } from "react";
import MealsList from "./MealsList/MealsList";
import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card";


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://foodapp-986b9-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Something Went Wrong!');
            }

            const data = await response.json();

            const mealsData = [];
            for (const key in data) {
                mealsData.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }
            setMeals(mealsData);
            setIsLoading(false);
        }

        fetchMeals().catch(err => {
            setIsLoading(false);
            setHttpError(err.message);
        });

    }, []);

    if (isLoading) {
        return <section className={classes.loading}>
            <p>Loading...</p>
        </section>;
    }

    if (httpError) {
        return <section className={classes.error}>
            <p>Unable to fetch data!</p>
        </section>
    }

    const listMeals = meals.map((meal) => (<MealsList
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
    />))

    return <section className={classes.meals}>
        <Card>
            <ul>
                {listMeals}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;