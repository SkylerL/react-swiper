import React, { Component } from 'react';
import './App.css';
import './button.css';
// some images for app bg
import swiperbg from './bg.png';
import bgFavour from './bgFavour.png';
import bgDetail from './bgDetail.png';
import swipercloseButton from './close.png';
import swiperfavoritesButton from './favorites.png';
import swiperdislikeButton from './dislike.png';
import swiperlikeButton from './like.png';
import swiperstate from './info.png';
import goBack from './GoBack.png';
import softnessword from './softness_word.png';
import durabilityword from './durability_word.png';
import durability from './durability.png';
import eco_friendly from './eco_friendly.png';
import softness from './softness.png';
//sample images
import sample1 from './sample1.jpg';
import sample2 from './sample2.jpg';
import sample3 from './sample3.jpg';
import sample4 from './sample4.jpg';
import sample7 from './sample7.jpg';
import sample6 from './sample6.jpg';
//images of made in 
import Usa from './usa.png';
import Portugal from './portugal.png';
import Vietnam from './vietnam.png';
import organic from './organic_sa.png';
import India from './india.png';
import Bangladesh from './bangladesh.png';
import China from './china.png';



var sampleList = [{image:[sample1, sample7, sample3, sample4], intro:'Everlasting Wardrobe Striped Pocket T-shirt',id:'0',madein:Usa,madeof:'100% orginic Cotton', softness:'4.8', durability:'5.0',price:'10.00',organic:true,ecofriendly:true}, 
                  {image:[sample2, sample6], intro:'Everlasting Wardrobe Striped Pocket T-shirt',id:'1', madein:China,madeof:'50% orginic Cotton,50% polyeste', softness:'3.8', durability:'4.8', price:'20.00',organic:true,ecofriendly:false},
                  {image:[sample4, sample7, sample3, sample4], intro:'Everlasting Wardrobe Striped Pocket T-shirt',id:'0',madein:Portugal,madeof:'100% orginic Cotton', softness:'4.8', durability:'5.0',price:'10.00',organic:true,ecofriendly:true}, 
                  {image:[sample6, sample7], intro:'Everlasting Wardrobe Striped Pocket T-shirt',id:'1', madein:India,madeof:'50% orginic Cotton,50% polyeste', softness:'3.8', durability:'4.8', price:'20.00',organic:true,ecofriendly:false},
                  {image:[sample7, sample1, sample2, sample4], intro:'Everlasting Wardrobe Striped Pocket T-shirt',id:'0',madein:Vietnam,madeof:'100% orginic Cotton', softness:'4.8', durability:'5.0',price:'10.00',organic:true,ecofriendly:true}, 
                  {image:[sample4, sample3], intro:'Everlasting Wardrobe Striped Pocket T-shirt',id:'1', madein:Bangladesh ,madeof:'50% orginic Cotton,50% polyeste', softness:'3.8', durability:'4.8', price:'20.00',organic:true,ecofriendly:false},
                 ];

class App extends Component {
  constructor(props){
    super(props);
    // init function
    this.onSelectClick = this.onSelectClick.bind(this);
    this.onDetailClick = this.onDetailClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onCloseDetail = this.onCloseDetail.bind(this);
    this.onShowFavorite = this.onShowFavorite.bind(this);
    this.onCloseFavorite = this.onCloseFavorite.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
    // init variable 
    this.state = {
      sampleSet: this.props.sampleSet,
      prevSample: this.props.prevSample,
      curSample: this.props.curSample,
      start: this.props.start,
      swiper: this.props.swiper,
      empty: this.props.empty,
      fade: this.props.fade,
      liked: this.props.liked, //favourite liked[]
      detailIsOpen: false,
      favoriteIsOpen: false,
      selectImagIsOpen: false,
      imgUrl: null,
      selectImgUrl: null,
    }
  }

  static defaultProps = {
    sampleSet: [],
    prevSample: [],
    curSample: [],
    start: 0,
    swiper: 2,
    empty: 'empty',
    fade: '',
    liked: [],
    detailIsOpen: false,
    favoriteIsOpen:false,
    selectImagIsOpen:false,
    imgUrl:[],
    selectImgUrl:[],
  }
  async componentDidMount(){
    this.setState((prevState) => {
      const sampleSet = prevState.sampleSet;
      sampleList.forEach(sample => {
        sampleSet.push(sample);
      });
      let curSample = prevState.curSample;
      let firstSample = sampleSet.shift();
      curSample.push(firstSample);
      let Obj = {
        sampleSet: sampleSet,
        curSample: curSample,
      };
      return Obj; 
    });
  }
   
  // async componentDidMount(){
  //   this.fetchData();
  // }

  // fetchData = () => {
  //   axios.get('http:// ')
  //   .then(
  //     (dataSet)=>{
  //       this.setState((prevState) => {
  //         let sampleSet = prevState.sampleSet;
  //         dataSet.forEach(sample => {
  //           sampleSet.push(sample);
  //         });
  //       })
  //     }
  //   )
  // }
  onDetailClick= (imgCur) =>{
    this.setState({detailIsOpen: true, imgUrl: imgCur});
  }

  onDeleteClick(){
    alert("Are you sure to delete your favourite cloth???");
  }
  
  onCloseDetail() {
    this.setState({detailIsOpen: false, selectImagIsOpen : false,fade:'disappear'});
  }
  onShowFavorite(){
    this.setState({favoriteIsOpen:true});
  }
  onSelectImage = (imgCur) => {
    this.setState({selectImagIsOpen: true, selectImgUrl: imgCur});
  }
  onCloseFavorite() {
    this.setState({favoriteIsOpen:false, fade:'disappear'});
  }

  onSelectClick = (action) => {
    const newSample = this.state.sampleSet.shift();
    if(action === 'dislike'){
      this.setState({fade: 'swiper-fade-left'});
    }else{
      this.setState({fade: 'swiper-fade-right'});
      this.setState((prevState) => {
        let liked = prevState.liked;
        liked.push(this.state.curSample[0]);
      })
    }

    if(this.state.swiper === 2){
      this.setState({swiper: 1});
    }else{
      this.setState({swiper: 2});
    }

    this.setState({start: 1, prevSample: this.state.curSample, curSample:[newSample]})

    if(this.state.sampleSet.length < 2){
      this.setState((prevState) => {
        let sampleSet = prevState.sampleSet;
        sampleList.forEach(sample => {
          sampleSet.push(sample);
        });
        let Obj = {sampleSet: sampleSet};
        return Obj;
      });
    }
  }

  render() {
    //init page
    if(this.state.curSample.length !== 0 && this.state.detailIsOpen === false && this.state.favoriteIsOpen === false){
      return (
        <div className="swiper-app">
          <div className="swiper-wrapper">
            <img src={swiperbg} alt="background" className="swiper-background"/>
            <img src={swiperfavoritesButton} alt="favorite" className="swiper-favorite-button" onClick={this.onShowFavorite} />
            { this.state.start === 1 && (
              <TopLayer  image={this.state.prevSample[0].image[0]} imageCur={this.state.curSample[0].image[0]} fade={this.state.fade} empty={this.state.empty} swiper={this.state.swiper} onDetailClick={this.onDetailClick} />
            )}
              <BottomLayer image={this.state.curSample[0].image[0]} imageCur={this.state.curSample[0].image[0]} info={this.state.curSample[0].intro} softness={this.state.curSample[0].softness} durability={this.state.curSample[0].durability} onDetailClick={this.onDetailClick} />
            <img src={swiperstate} alt="Tap Image for More Information" className="swiper-state"  />
            <img src={swiperdislikeButton} alt="dislike" className="swiper-dislike-button" onClick={()=> {this.onSelectClick('dislike')}}/>
            <img src={swiperlikeButton} alt="like" className="swiper-like-button"  onClick={()=> {this.onSelectClick('like')}}/>
            <img src={swipercloseButton} alt="close X" className="swiper-close-button" />
            
          </div>
        </div>
      );
    }else if(this.state.curSample.length !== 0 && this.state.detailIsOpen === true){
      //open detail page
      return(
        <div className="swiper-app">
          <div className="swiper-wrapper">
            <img src={bgDetail} alt="background" className="swiper-background"/>
                <SelectImg data = {sampleList} onSelectImage={this.onSelectImage} selectImgUrl ={this.state.selectImgUrl} curImage = {this.state.imgUrl} condition={this.state.selectImagIsOpen} />
            <div className="detail-info">
                <Detail data = {sampleList} curImage={this.state.imgUrl} />
            </div>
        <img src={goBack} className="swiper-goback-button" onClick={this.onCloseDetail} />
      </div>
    </div>
    );
  } else if(this.state.curSample.length !== 0 && this.state.detailIsOpen === false && this.state.favoriteIsOpen === true){
    //open favoriate page
    return(
      <div className="swiper-app">
        <div className="swiper-wrapper">
          <img src={bgFavour} alt="background" className="swiper-background"/>
          <div className="favourite-list-layout" > 
            <FavoriteShow data = {this.state.liked} onDetailClick = {this.onDetailClick} onDeleteClick = {this.onDeleteClick} imageCur = {sample1}/>
         </div>
         <img src={goBack} className="swiper-goback-button" onClick={this.onCloseFavorite}/>

     </div>
  </div>
  );
}
    else {
      return (
        <div className="swiper-app"></div>
      );
    }
  }
}

function TopLayer({image, fade, empty, swiper,onDetailClick, imageCur}) {
  if(swiper === 1){
    return (
      <div>
        <div className={`swiper-topLayer1 ${fade}`} onClick={()=>{onDetailClick(imageCur)}}>
          <Image sample={image}/>
        </div>
        <div className={`swiper-topLayer2 ${empty}`} onClick={()=>{onDetailClick(imageCur)}}>
          <Image sample={image}/>
        </div>
      </div>
    )
  }else{
    return (
      <div>
        <div className={`swiper-topLayer1 ${empty}`} onClick={()=>{onDetailClick(imageCur)}}>
          <Image sample={image}  />
        </div>
        <div className={`swiper-topLayer2 ${fade}`} onClick={()=>{onDetailClick(imageCur)}}>
          <Image sample={image}  />
        </div>
      </div>
    )
  }
};

function BottomLayer({image, info, onDetailClick, imageCur,softness, durability}) {
  return (
    <div>
      <div className="swiper-bottomLayer" onClick={()=>{onDetailClick(imageCur)}}>
        <Image sample={image} />
      </div>
      <div className="swiper-info">
        <p className="detail-title"><b>{info}</b></p>
      <div className="frs-softness-durablity">
        <p>
          <b>
            <span className="frs-softness-num">{softness}</span>
            <span className="frs-durability-num">{durability}</span>
          </b>
        </p>
       </div>
      <div className="frs-softness-durablity-image">
        <p>
        <img className="softness-image" src={softnessword} alt="softness"/>
        <img className="durability-image" src={durabilityword} alt="durability" />
        </p>
        </div>
      
      </div>
    </div>
  )
};

function Image({sample}) {
  return (
      <img src={sample} alt="clothing" className="swiper-image"/>
  );
};

//show detail 
function Detail({data, curImage}) {
  var l = data.length;
  var id = -1;
  var isOrganic = true;
  var isEcofriendly = true;
  for(var i = 0; i < l; i++) {
      if(data[i].image[0] == curImage) {
        id = data[i].id;
        break;
      }else{
        id = 1;
      }
  }
  //choose show or non-show the orangic 
  if(data[i].organic == true ) {
      isOrganic = "inline";
  }else {
    isOrganic = "none";
  }
  if(data[i].ecofriendly == true) {
    isEcofriendly = "inline";
  }else {
    isEcofriendly = "none";
  }
  return (
    <div className="detail-div">
      <div>
       <p className="detail-title"><b>{data[id].intro}</b></p>
       <p className="detail-title-layout"><span className="detail-madeof"><i>{data[id].madeof}</i></span> <span className="detail-price"><i>msrp:${data[id].price}</i></span></p>
      </div>
      <div className="durability-softness-image">
        
        <img src={softness} className="softness"></img>
        <img src={durability} className="durability"></img>
      </div>
      <div>
        <p className="softness-durability-layout"><b><span className="detail-softness">{data[id].softness}</span><span className="detail-durability">{data[id].durability}</span></b></p>
      </div>
     
      <div className="organic-layout-image" >
        <img className="organic" src={organic} style={{display:isOrganic}}></img>
        <img className="eco_friendly" style={{display:isEcofriendly}} src={eco_friendly}></img>
        <img className="country" src={data[id].madein}></img>
      </div>
      <div>

      </div>
    </div>
  );
};
//
function SelectImg({data, onSelectImage, curImage, selectImgUrl, condition}) {
      var lAll = data.length;
      var data1 = new Array(); 
      for(var i = 0; i < lAll; i++) {
          if(data[i].image[0] == curImage) {
            data1 = data[i]; 
            break;
          }
      }
      var len = data1.image.length;
      console.log
      var data2 = new Array(); 
      for(var i = 0; i < len; i++) {
        data2[i] = i;
      }
      var picture;
     if(selectImgUrl == null || condition == false) {
      picture = curImage;
     }else {
      picture = selectImgUrl;
     }
      return (
        <div className = "image-body">
           <div className = "large-image-layout">
          <img src={picture} className="large-image-detail"/>
        </div>
          <div className="small-image-layout">
          <table className="small-image-table">
            <tbody>
              <tr>
                {data2.map(n => {
                    return (
                      <img src={data1.image[n]} className="small-image" onClick={()=>{onSelectImage(data1.image[n])}}/>
                    )
                })}
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      );
};

function FavoriteShow({data, onDetailClick, imageCur,deleteBtn}){
      var length = data.length;
      return (
        <div className="favorite">
              {data.map(n => {
                return (
                  <div className="favorite-div" >
                    <span ><button className="delete-btn">delete</button></span>
                    <span className ="favorite-image"onClick={()=>{onDetailClick(n.image[0])}} key={n.id} ><img src={n.image[0]} className ="favorite-image" /></span>
                    <span className ="favorite-name" onClick={()=>{onDetailClick(n.image[0])}} key={n.id}>{n.intro}</span>
                  </div>
                )
              })}

        </div>    
      );
};

export default App;
