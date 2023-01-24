import React from "react" 
import memesData from "../memesData"
// instead of using this hard coded data, I need to get the data from an API

export default function Meme() {
    // if empty value doesn't work, then take it as "http://i.imgflip.com/1bij.jpg"
    // const [image, setImage] = React.useState("")

    // packing the whole meme properties into a single object as the state variable
    const [meme, setMeme] = React.useState({
        topText: "ONE DOES NOT SIMPLY",
        bottomText: "WALK INTO MORDOR",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    // using another state variable to store all the memes data
    // const [allMemeImages, setAllMemeImages] = React.useState(memesData)
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
            // .then(data => console.log(data))

        // the fetch request gives an object, that also contains the data field 
        // which contains an array of objects representing the memes.
    }, [])

    function handlingClick() {
        // const index = Math.floor(Math.random()*(memesData.length))
        const index = Math.floor(Math.random()*allMemes.length)

        // console.log(memesData[index].image)
        // setImage(memesData[index].image)

        // have to alter the meme object to get the random image
        setMeme(prevMeme => ({
            ...prevMeme,
            // randomImage: memesData[index].image 
            randomImage: allMemes[index].url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => (
            {
                ...prevMeme,
                [name] : value
            }
        ))
    }
    // console.log(meme);
    return (
        <div>
            <div className="form">
                <div className="form-input">
                    <input placeholder="shut up"
                        value={meme.topText}
                        name="topText"
                        onChange={handleChange}
                    />
                    <input placeholder="and take my money"
                        value={meme.bottomText}
                        name="bottomText"
                        onChange={handleChange}
                    />
                </div>
                
                <button className="form-button"
                    onClick={handlingClick}>
                    Get a new meme image
                </button>
            </div>
            
            <div className="meme">
                {meme.randomImage && <img src={meme.randomImage} className="meme-image"/>}
                <h1 className="meme-text-top">{meme.topText}</h1>
                <h1 className="meme-text-bottom">{meme.bottomText}</h1>
            </div>
        </div>
    )
}