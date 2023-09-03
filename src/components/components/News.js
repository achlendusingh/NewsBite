import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News =(props)=>{
   const [articles, setArticles]=useState([])
   const [loading, setLoading]=useState(true)
   const [page, setPage]=useState(1)
   const [totalResults, setTotalResults] = useState(0)

  //  document.title=`${this.capitalizeFirstLetter(props.category)} - NewsBite`;

  const capitalizeFirstLetter = (string)=> {
  return (string.charAt(0).toUpperCase() + string.slice(1));
}

 

  

  const updateNews =async ()=>{
    props.setProgress(0);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea5fcba851cc43c7895cdce894828c1c&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  setArticles(parsedData.articles) 
  setTotalResults(parsedData.totalResults)
  setLoading(false)
   
  props.setProgress(100);
  }




  useEffect(() => {
    updateNews();
  },[]
    )

 
 const fetchMoreData = async() => {
    setPage(page+1)
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea5fcba851cc43c7895cdce894828c1c&page=${page+1}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(articles.concat(parsedData.totalResults))
   };

    return (
      <>
        <h1 className="text-center" style={{margin:'40px 0px',marginTop:'90px', color:'#2b5661'}}>NewsBite - Top  
             {" "+ capitalizeFirstLetter(props.category) }  Headlines </h1>
       {loading && <Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
              
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps={
  country:'in',
  pageSize: 8,
  category: "general",
 }
 
News.propTypes={
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string,
 }
export default News;