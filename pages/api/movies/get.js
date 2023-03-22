import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {
        const { title, limit=5 } = req.query;

        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const movies = await db
            .collection("movies")
            .find({ title: {$regex: title, $options: '-i'} })
            .sort({ metacritic: -1 })
            .limit(parseInt(limit))
            .toArray()
            
            

        res.json(movies);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching movies");
    }
};
