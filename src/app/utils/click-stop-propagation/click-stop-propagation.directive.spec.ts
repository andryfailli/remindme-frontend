import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

describe('ClickStopPropagationDirective', () => {
  it('should create an instance', () => {
    const directive = new ClickStopPropagationDirective();
    expect(directive).toBeTruthy();
  });
  it('should call stopPropagation on click', () => {
    const eventMock = {
      stopPropagation: () => true
    };
    spyOn(eventMock, 'stopPropagation');
    const directive = new ClickStopPropagationDirective();
    directive.onClick(eventMock);
    expect(eventMock.stopPropagation).toHaveBeenCalled();
  });
});
