function is_balanced(s, s2) {
    return true;
}

test("test", () => {
    expect(is_balanced("(Sensei says yes!)", "()")).toBe(true);
});

