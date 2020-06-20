/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function(req, res) {
    Articles.find({}).exec(function(err, articles) {
      if (err) {
        res.send(500, {error: 'Database Error while fetching articles'});
      }
      res.view('list', {articles});
    });
  },
  add: function(req, res) {
    res.view('add');
  },
  create: function(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    Articles.create({title, body}).exec(function(err) {
      if (err) {
        res.send(500, {error: 'Database Error while creating article'});
      }
      res.redirect('/articles/list');
    });
  },
  delete: function(req, res) {
    Articles.destroy({id: req.params.id}).exec(function(err) {
      if (err) {
        res.send(500, {error: `Database Error while deleting article with id ${req.params.id}`});
      }
      res.redirect('/articles/list');
    });
    return false;
  },
  edit: function(req, res) {
    Articles.findOne({id: req.params.id}).exec(function(err, article) {
      if (err) {
        res.send(500, {error: `Error While fetching Article with id ${req.params.id}`});
      }
      res.view('edit', {article});
    });
  },
  update: function(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    Articles.update({id: req.params.id}, {title, body}).exec(function(err) {
      if (err) {
        res.send(500, {error: `Database Error while updating Article with id ${req.params.id}`});
      }
      res.redirect('/articles/list');
    });
    return false;
  },
};
