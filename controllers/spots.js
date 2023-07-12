const Spot = require('../models/spot');
const { cloudinary } = require('../cloudinary');
module.exports.index = async (req, res) => {
    const spots = await Spot.find({});
    res.render('spots/index', { spots })
}

module.exports.renderNewForm = (req, res) => {
    const darkmode = req.cookies.darkmode || 'false';
    res.render('spots/new', { darkmode });
}

module.exports.createSpot = async (req, res, next) => {
    const spot = new Spot(req.body.spot);
    spot.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    spot.author = req.user._id;
    await spot.save();
    req.flash('success', 'Successfully made a new spot!');
    res.redirect(`/spots/${spot._id}`)
}

module.exports.showSpot = async (req, res) => {
    const darkmode = req.cookies.darkmode || 'false';
    const spot = await Spot.findById(req.params.id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!spot) {
        req.flash('error', 'Cannot find that spot!');
        return res.redirect('/spots');
    }
    console.log(spot)
    res.render('spots/show', { spot, darkmode });
}

module.exports.renderEditForm = async (req, res) => {
    const darkmode = req.cookies.darkmode || 'false';
    const spot = await Spot.findById(req.params.id);
    if(!spot){
        req.flash('error', 'Cannot find that spot!');
        return res.redirect('/spots');
    }
    res.render('spots/edit', { spot, darkmode });
}

module.exports.updateSpot = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    spot.images.push(...imgs);
    await spot.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await spot.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(spot)
    }
    
    req.flash('success', 'Successfully updated spot!');
    res.redirect(`/spots/${spot._id}`)
}

module.exports.deleteSpot = async (req, res) => {
    const { id } = req.params;
    await Spot.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted spot!')
    res.redirect('/spots');
}