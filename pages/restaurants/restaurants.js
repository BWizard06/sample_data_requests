import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const response = await fetch(`/api/restaurants/get`);
                const data = await response.json();
                setRestaurants(data);
                console.log(data)
            } catch (e) {
                console.error(e);
            }
        };

        getRestaurants();
    }, []);

    return (
        <div className={styles.container}>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant._id} className={styles.movie}>
                        <h1>{restaurant.name}</h1>
                    </li>
                ))}
            </ul>
        </div>
    );
}
