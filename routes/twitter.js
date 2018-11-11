var express = require('express');
var router = express.Router();
var fs = require('fs');
var Twit = require('twit');
var multer = require('multer');
//Multer Setup
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({
    storage: storage
});


//twitter bot setup
var T = new Twit(require('../config/config'));
router.get('/', (req, res, next) => {
    var params = {
        count: 50
    }
    T.get('statuses/home_timeline', params, function (err, data, response) {
        console.log(data);
        // res.json(data); 
        res.render('tweets', {
            data: data
        });
    });
});


router.post('/', upload.single('avatar'), (req, res, next) => {
    console.log(req.file);
    /*var b64content = */
    fs.readFile('F:\\xampp\\htdocs\\NodeJS\\A LATEST PROJECT\\Bhhopal\\lastpart\\bhopal\\' + req.file.path, {
        encoding: 'base64'
    }, function (err, b64content) {
        //WARNING

        T.post('media/upload', {
            media_data: b64content
        }, function (err, data, response) {
            // now we can assign alt text to the media, for use by screen readers and
            // other text-based presentations and interpreters
            var mediaIdStr = data.media_id_string
            var altText = "Small flowers in a planter on a sunny balcony, blossoming."
            var meta_params = {
                media_id: mediaIdStr,
                alt_text: {
                    text: altText
                }
            }
            T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    // now we can reference the media and post a tweet (media will attach to the tweet)
                    var params = {
                        status: req.body.tweet,
                        media_ids: [mediaIdStr]
                    }

                    T.post('statuses/update', params, function (err, data, response) {
                        console.log(data);
                        res.redirect('/twitter');
                    })
                }
            })
        })



        //WARNING ENDS
    })
    // var b64content = fs.readFileSync('I:\\bhopal\\images\\image.jpg', { encoding: 'base64' })

    // first we must post the media to Twitter
    // T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    //   // now we can assign alt text to the media, for use by screen readers and
    //   // other text-based presentations and interpreters
    //   var mediaIdStr = data.media_id_string
    //   var altText = "Small flowers in a planter on a sunny balcony, blossoming."
    //   var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    //   T.post('media/metadata/create', meta_params, function (err, data, response) {
    //     if (!err) {
    //       // now we can reference the media and post a tweet (media will attach to the tweet)
    //       var params = { status: req.body.tweet, media_ids: [mediaIdStr] }

    //       T.post('statuses/update', params, function (err, data, response) {
    //         console.log(data)
    //       })
    //     }
    //   })
    // })

    // T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
    //     console.log(data);
    //     res.redirect('/twitter');
    //     //res.json(data);
    //       });
});

module.exports = router;