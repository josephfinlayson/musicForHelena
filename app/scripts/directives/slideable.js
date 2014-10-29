//https://github.com/EricWVGG/AngularSlideables/edit/master/angularSlideables.js
'use strict';
angular.module('angularSlideables', [])
    .directive('slideable', function() {
        return {
            restrict: 'C',
            scope: {
                onOpen: '@',
                onClose: '@',
            },
            compile: function(element, scope) {
                // wrap tag
                var contents = element.html();
                element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                return function postLink(scope, element, attrs) {
                    // default properties
                    attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                    attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                    element.css({
                        'overflow': 'hidden',
                        'height': '0px',
                        'transitionProperty': 'height',
                        'transitionDuration': attrs.duration,
                        'transitionTimingFunction': attrs.easing
                    });
                };
            }
        };
    })
    .directive('slideToggle', function($rootScope) {

        var collapseElement = function(el) {
            el.style.height = "0px";
            window.el = el;
            console.log("removeClass", el)

            // $(el).parents('.row').removeClass('expanded')
            var $row =  $(el).prev('.row.expanded');
            $row.removeClass('expanded');
            $row.find('a.selected').removeClass('selected');
            // $(el).siblings('.row.expanded').removeClass('expanded')
            // $(el).siblings('.row').removeClass('expanded')



        }

        var collapseOtherSliders = function(element) {
            $('.slideable').each(function(a, el) {
                if (el !== element[0]) {
                    collapseElement(el)
                        // pause this video
                    $rootScope.$emit('close')
                } else {
                    // console.log("this is not being closed", el)
                }
            })
        }

        return {
            restrict: 'A',
            scope: {
                onOpen: '=',
                onClose: '=',
            },
            link: function(scope, element, attrs) {
                // scope.onClose()
                var target, content;
                attrs.expanded = false;
                var $element = $(element);
                var $parentRow = $element.parents('.row');

                element.bind('click', function() {

                    if (!target) {
                        target = document.querySelector(attrs.slideToggle);
                    }
                    if (!content) {
                        content = target.querySelector('.slideable_content');
                    }
                    // if

                    // if it doesn't have the expanded class, open it normally
                    if (!$parentRow.hasClass('expanded')) {
                        //close other sliders
                        collapseOtherSliders($(target));

                        // content.style.border = '1px solid rgba(0,0,0,0)';
                        // var y = content.clientHeight;

                        content.style.border = 0;
                        target.style.height = '390px'; // height of youtube player

                        $parentRow.addClass('expanded')
                        $element.addClass('selected')
                        console.log("calling on open")
                        scope.onOpen()


                    } else {
                        //  if the element has the expanded class, check if the
                        //  $element is not selected, if it isn't do nothing

                        if (!$element.hasClass('selected')) {
                            //do nothing
                            $element.addClass('selected')
                        } else {
                            $parentRow.removeClass('expanded')
                            $element.removeClass('selected')
                            console.log("calling on close")
                            scope.onClose()
                            target.style.height = '0px';
                        }
                    }
                    $rootScope.$on('close', function() {
                        scope.onClose()
                    })

                });
            }
        };
    });
