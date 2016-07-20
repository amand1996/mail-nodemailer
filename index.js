var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var path = require('path')
var EmailTemplate = require('email-templates').EmailTemplate;



var generator = require('xoauth2').createXOAuth2Generator({
    user: < Enter user here > ,
    clientId: < Enter clientId here > ,
    clientSecret: < Enter code here > ,
    refreshToken: < Enter token here > ,
    accessToken: < Enter token here >
});

generator.on('token', function(token) {
    console.log('New token for %s: %s', token.user, token.accessToken);
});

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        xoauth2: generator
    }
});


// If email template is used
var template = new EmailTemplate(path.join(__dirname, < templates folder > , < folder name of template > ));

var locals = {
    fname: user[i].Name,
    your_name: user[i].From,
}

template.render(locals, function(err, results) {

    if (err) {
        return console.error(err)
    } else {
        transporter.sendMail({
            from: <email id>,
            to: user[i].Email,
            subject: <subject>,
            replyTo: user[i].ReplyTo,
            html: results.html,
            text: results.text,
        }, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            };
        });
    }
})