abstract class ActiveLayer {
  abstract render(context: CanvasRenderingContext2D, scale: number): void;
  abstract reset(): void;
}

export default ActiveLayer;
