import express, {Request,Response} from 'express';

const cors = require('cors');
const fs = require('node:fs');
const app= express();
const port=7000;

app.use(cors())
app.use(express.json())

type Movie ={
    id:number;
    name: string;
}

function findAllMovies(){
    const data= fs.readFileSync("data/movies.json","utf8");
    const res= JSON.parse(data)
    return res
}

app.get('/', (req, res)=>{
    res.send("Hello world ");
});
app.get("/movies",(req,res)=>{
    const data= fs.readFileSync("data/movies.json","utf8");
    const movies =JSON.parse(data);
    res.json(movies);
});

app.get("/movies/details", (req, res)=>{

})

app.get("/movies/create", (req, res)=>{

});

// app.get("/movies/:id",findById);
//  function findById(req:Request,res:Response){
//     const movies = findAllMovies();
//     const movie = movies.find((movie:Movie)=> movie.id === Number (movieId));
//     req.json(movie);
//  }
// app.get('movies/:id',findById);
//     const {name}=req.query;

//     //1. read json from file
//     const data = fs.readFileSync("data/movies.json", "utf8");
//     const movies = JSON.parse(data);

//     //2.push to json array
//     movies.push({
//         id:Date.now(),
//         name,
//     });

    
//     //Find one movie by Id
//     app.get('/movie/:id', findById);

//     //Update one movie by Id 
//     app.patch('/movies/:id', (req, res)=>{
//         const movieid = req.params.id;
//         const body = req.body;
//         const movies= findAllMovies();

//         const updateMovies=movies.map((movie)=>{
//             if (movie.id === Number(movieId)){
//                 return{
//                     ...movie,
//                     ...body,
//                 };
//             }
//             return movie;
//         });
        
//     })



    //DELETE one movie by Id
app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;

    if (movieId === undefined) {
        res.status(404);
        res.json({
        message: 'Not found',
    });
    return;
}

const movies = findAllMovies();

    //Method 1
    const updateMovies=movies.filter((e:Movie) => e.id !== Number(movieId));

    //Method 2

    try {
    const oneMovieIdx = movies.findIndex((e:Movie)=> e.id === Number(movieId))
    const restMovies = movies.splice(oneMovieIdx, 1);

    if (oneMovieIdx < 0){
        res.json({
            message: 'Movies not found'
        });
    }

    //3.write json to file
    const moviesString = JSON.stringify(restMovies, null, 4 );
    fs.writeFileSync("data/movies.json",moviesString);

    res.json({
        message: "Ustsan..",
    });
    } catch (e){
    res.json({
        message:e,
    })
    }
})
// app.get("/movies/update", (req, res)=>{});
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)

});
