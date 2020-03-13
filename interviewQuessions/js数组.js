function Queue(Maxsize) {
  this.Maxsize = Maxsize;
  this.front = -1;
  this.tail = -1;
  this.data = [];
  this.add = function(el) {
    this.data.push(el);
    this.tail++;
  };
  this.del = function(el) {
    // this.data.unshif(this.data[this.front]);
    this.front++;
  };
}
