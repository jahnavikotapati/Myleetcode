var maxArea = function(height) {
    let left = 0, right = height.length - 1, max = 0;
    while (left < right) {
        let h = Math.min(height[left], height[right]);
        max = Math.max(max, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return max;
};
