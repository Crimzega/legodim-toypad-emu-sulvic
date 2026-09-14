export default class Tag{

    static TAG_SIZE = 180;
    static PAGE_SIZE = 4;
    static PAGES_PER_READ = 4;

    constructor(data){ this.data = data || new Buffer(Tag.TAG_SIZE); }

    get uid(){ return this.data.slice(0, 3).toString("hex") + this.data.slice(4, 8).toString("hex"); }

    get(page){
        let start = page * Tag.PAGE_SIZE;
        let end = start + Tag.PAGE_SIZE;
        return this.data.slice(start, end);
    }

    set(page, data){
        var start = page * Tag.PAGE_SIZE;
        data.copy(this.data, start);
    }

    readFile(file, cb){
        let self = this;
        cb = cb || function(){};
        fs.readFile(file, function(err, data){
            if(err) return cb(err);
            self.data = data;
            self.init();
            cb();
        })
    }

    writeFile(file, cb){
        cb = cb = function(){};
        fs.writeFile(file, this.data, function(err){ cb(err); });
    }

}
