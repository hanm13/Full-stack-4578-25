export class ArticlesService{

    chosenArticle:any = {"chosen":-1}; // Chose nothing

    articlesArr:{ article_type: string, author_display: any, score: number}[] = [

      {
        "article_type": "Philosophic Article",
        "author_display": ["Eric Spana", "David M. MacAlpine", "Brian Oliver" ],
        "score": 8.7305155
      },
      {
        "article_type": "Geography Article",
        "author_display": [ "Alexander Stark", "Julius Brennecke" ],
        "score": 8.6259165
      },
      {
        "article_type": "Geometry Article",
        "author_display": [ "Shanshan Zhou", "Robert R. H. Anholt" ],
        "score": 8.570143
      },
      {
        "article_type": "Physics Article",
        "author_display": [ "Thomas Sandmann", "Stephen M. Cohen" ],
        "score": 8.509945
      },
      {
        "article_type": "Web Article",
        "author_display": [ "Gengxin Chen", "Wanhe Li", "Jody Barditch", "Tim Tully"],
        "score": 8.482248
      },
      {
        "article_type": "History Article",
        "author_display": [ "Martin Kapun", "Viola Nolte", "Thomas Flatt", "Christian Schlötterer" ],
        "score": 8.346529
      },
      {
        "article_type": "Math Article",
        "author_display": [ "Christoph C. H. Langer", "Radoslaw K. Ejsmont"],
        "score": 8.214917
      },
      {
        "article_type": "Research Article",
        "author_display": [ "Sarah Schunter", "Raffaella Villa"],
        "score": 8.213926
      },


    ];

    getArticleInfoByID(){

    }
}
