module.exports = function(server,router){
    server.post('/user/login',(req,res) => {
        res.cookie('isAuthenticated',true,{maxAge:5000})
        let db = router.db
        let data = db.get('user-login').value()
        res.jsonp(data)
    })
}