class HomeController {
    static async index(req, res) {
       res.render('index', {
        title: "judul",
       })
    }
}

export default HomeController;