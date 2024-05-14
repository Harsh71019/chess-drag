export class Game {
  knightPosition = [1, 7];
  elephantPosition = [0, 7];
  observers = [];

  observe(o) {
    this.observers.push(o);
    this.emitChange();
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }
  moveKnight(toX, toY) {
    this.knightPosition = [toX, toY];

    if (toX === this.elephantPosition[0] && toY === this.elephantPosition[1]) {
      return false;
    }
    this.emitChange();
  }

  moveElephant(toX, toY) {
    this.elephantPosition = [toX, toY];
    if (toX === this.knightPosition[0] && toY === this.knightPosition[1]) {
      return false;
    }
    this.emitChange();
  }

  canMoveKnight(toX, toY) {
    const [x, y] = this.knightPosition;

    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  canMoveElephant(toX, toY) {
    const [currentX, currentY] = this.elephantPosition;

    const dx = Math.abs(toX - currentX);
    const dy = Math.abs(toY - currentY);
    // Check if the move is either horizontal or vertical
    if ((dx !== 0 && dy === 0) || (dx === 0 && dy !== 0)) {
      return true;
    }
    // If the move is not either horizontal or vertical, it's invalid
    return false;
  }

  emitChange() {
    const pos = {
      knightPosition: this.knightPosition,
      elephantPosition: this.elephantPosition,
    };
    this.observers.forEach((o) => o && o(pos));
  }
}
