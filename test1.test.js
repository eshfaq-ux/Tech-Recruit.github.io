```javascript
describe('Spinner removal', () => {
    test('Spinner should be removed after 1 second', () => {
        document.body.innerHTML = '<div id="spinner" class="show"></div>';
        const spinner = document.getElementById('spinner');
        expect(spinner).not.toBeNull();
        expect(spinner.classList.contains('show')).toBe(true);

        // Simulate the setTimeout function
        (function ($) {
            "use strict";

            // Spinner
            var spinner = function () {
                setTimeout(function () {
                    if ($('#spinner').length > 0) {
                        $('#spinner').removeClass('show');
                    }
                }, 1);
            };
            spinner();
        })(jQuery);

        jest.advanceTimersByTime(1001); //add 1ms to ensure timeout has passed

        expect(spinner.classList.contains('show')).toBe(false);
    });
});

```
