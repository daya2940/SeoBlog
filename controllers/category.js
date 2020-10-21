const Category  = require('../models/category');
const Blog  = require('../models/blog');

// slugify  helps to fetch word like saurav-kumar which otherwise is not possible
const slugify = require('slugify');
const {errorHandler} = require('../helpers/DbHandlers');

exports.create = (req,res) =>{
  const {name} = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({name,slug});

  category.save((err,data) => {
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
  });
}

exports.list = (req,res) => {
  Category.find({}).exec((err,data) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      return res.json(data);
  });
};

exports.read = (req,res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOne({slug}).exec((err,category) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      // return res.json(category);
      Blog.find({categories:category})
      .populate('categories','_id name slug')
      .populate('tags','_id name slug')
      .populate('postedBy','_id name')
      .select('_id title slug excerpt categories postedBy,tags,createdAt,postedAt')
      .exec(data => {
        if(err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        return res.json({category:category,blogs:data});
      })
  })
}

exports.remove = (req,res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOneAndRemove({slug}).exec((err,category) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      return res.json({
        message: 'category deleted successfully'
      });
  })
}