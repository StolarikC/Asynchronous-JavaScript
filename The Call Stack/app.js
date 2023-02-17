const multiply = (x, y) => x * y;

const square = x => multiply(x, x);

const is rightTriangle = (a, b, c) => (
    square(a) + square(b) === square(c)
)

// When rightTriangle is called, it calls square.
// Square calls multiply
// multiply evaluates and returns a value.
// multiply passes that value to square
// multiply disappears
// square is now evaluated and passes the value to rightTriangle
// This process is repeated for variables a, b, and c.
// once all three are defined, rightTriangle can finally evaluate itself.
// rightTriangle ultimately returns true or false.
