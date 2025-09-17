class FoodRatings {
  constructor(foods, cuisines, ratings) {
    this.foodToCuisine = new Map();
    this.foodToRating = new Map();
    this.cuisineToHeap = new Map();

    for (let i = 0; i < foods.length; i++) {
      let f = foods[i], c = cuisines[i], r = ratings[i];
      this.foodToCuisine.set(f, c);
      this.foodToRating.set(f, r);
      if (!this.cuisineToHeap.has(c)) this.cuisineToHeap.set(c, []);
      this._push(c, f, r);
    }
  }

  changeRating(food, newRating) {
    this.foodToRating.set(food, newRating);
    const cuisine = this.foodToCuisine.get(food);
    this._push(cuisine, food, newRating);
  }

  highestRated(cuisine) {
    const heap = this.cuisineToHeap.get(cuisine);
    while (heap.length) {
      let [negRating, food] = heap[0];
      let actual = this.foodToRating.get(food);
      if (-negRating === actual) return food;
      this._pop(heap);
    }
  }

  _push(cuisine, food, rating) {
    const heap = this.cuisineToHeap.get(cuisine);
    heap.push([-rating, food]);
    this._heapifyUp(heap, heap.length - 1);
  }

  _pop(heap) {
    if (heap.length === 1) return heap.pop();
    const top = heap[0];
    heap[0] = heap.pop();
    this._heapifyDown(heap, 0);
    return top;
  }

  _heapifyUp(heap, i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this._compare(heap[i], heap[p])) {
        [heap[i], heap[p]] = [heap[p], heap[i]];
        i = p;
      } else break;
    }
  }

  _heapifyDown(heap, i) {
    const n = heap.length;
    while (true) {
      let l = 2 * i + 1, r = 2 * i + 2, best = i;
      if (l < n && this._compare(heap[l], heap[best])) best = l;
      if (r < n && this._compare(heap[r], heap[best])) best = r;
      if (best !== i) {
        [heap[i], heap[best]] = [heap[best], heap[i]];
        i = best;
      } else break;
    }
  }

  _compare(a, b) {
    if (a[0] !== b[0]) return a[0] < b[0]; // higher rating first (since negative)
    return a[1] < b[1]; // lexicographically smaller first
  }
}
