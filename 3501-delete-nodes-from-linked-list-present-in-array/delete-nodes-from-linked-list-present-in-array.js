var modifiedList = function(nums, head) {
    const set = new Set(nums);
    let dummy = new ListNode(0, head);
    let current = dummy;
    while (current.next) {
        if (set.has(current.next.val)) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return dummy.next;
};
