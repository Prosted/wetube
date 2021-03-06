import routes from "../routes";
import Video from "../models/Video";

//home
export const home = async (req, res) => {
  try{
    const videos = await Video.find({}).sort({_id : -1});
    res.render("home", {pageTitle:"home", videos});
  } catch(error){
    console.log(error);
    res.render("home", {pageTitle:"home", videos : [] });
  }
};





//search
export const search = async (req, res) => {
  const {
      query: { term: searchingBy }
  } = req;
  let videos=[];
  try{
    videos = await Video.find({title : {$regex : searchingBy, $options : "i"}});
  }catch(error){
    console.log(error);
  }
  res.render("search", {pageTitle:"search", searchingBy, videos});
}





//upload
export const getUpload = (req, res) => res.render("upload", {pageTitle:"upload"});
export const postUpload = async (req, res) => {
  const {
    body : {title, description},
    file : {path}
  } = req;
  const newVideo = await Video.create({
    fileUrl : path,
    title,
    description
  });
  res.redirect(routes.videoDetail(newVideo.id));
};






//videoDetail
export const videoDetail = async (req, res) => {
  const {
    params : {id}
  } = req;
  try{
    const video = await Video.findById(id);
    res.render("videoDetail", {pageTitle:video.title, video});
  } catch(error){
    res.redirect(routes.home);
  }
}








//editVideo
export const getEditVideo = async (req, res) => {
  const {
    params : {id}
  } = req;
  try{
    const video = await Video.findById(id);
    res.render("editVideo", {pageTitle:`Edit ${video.title}`, video});
  }catch(error){
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params : {id},
    body : {title, description}
  } =req;
  try{
    await Video.findByIdAndUpdate({_id:id}, {title, description});
    res.redirect(routes.videoDetail(id));

  }catch(error){
    res.redirect(routes.home);
  }
};




//deleteVideo
export const deleteVideo = async (req, res) => {
  const {
    params : {id}
  } =req;
  try{
    await Video.findByIdAndRemove({_id : id});
  }catch(error){
    console.log(error);
  }
  res.redirect(routes.home);
};
