/*global define*/
define([
        '../Core/defaultValue',
        '../Core/defined',
        '../Core/defineProperties',
        '../Core/DeveloperError',
        '../Core/Event',
        './createPropertyDescriptor'
    ], function(
        defaultValue,
        defined,
        defineProperties,
        DeveloperError,
        Event,
        createPropertyDescriptor) {
    "use strict";

    /**
     * Describes a two dimensional icon located at the position of the containing {@link Entity}.
     * <p>
     * <div align='center'>
     * <img src='images/Billboard.png' width='400' height='300' /><br />
     * Example billboards
     * </div>
     * </p>
     *
     * @alias BillboardGraphics
     * @constructor
     *
     * @param {Object} [options] Object with the following properties:
     * @param {Property} [options.image] A Property specifying the Image, URI, or Canvas to use for the billboard.
     * @param {Property} [options.show=true] A boolean Property specifying the visibility of the billboard.
     * @param {Property} [options.scale=1.0] A numeric Property specifying the scale of the image size.
     * @param {Property} [options.horizontalOrigin=HorizontalOrigin.CENTER] A Property specifying the {@link HorizontalOrigin}.
     * @param {Property} [options.verticalOrigin=VerticalOrigin.CENTER] A Property specifying the {@link VerticalOrigin}.
     * @param {Property} [options.eyeOffset=Cartesian3.ZERO] A {@link Cartesian3} Property specifying the eye offset.
     * @param {Property} [options.pixelOffset=Cartesian2.ZERO] A {@link Cartesian2} Property specifying the pixel offset.
     * @param {Property} [options.rotation=0] A numeric Property specifying the rotation.
     * @param {Property} [options.alignedAxis=Cartesian3.ZERO] A {@link Cartesian3} Property specifying the billboard axis of rotation.
     * @param {Property} [options.width] A numeric Property specifying the width of the billboard in pixels, overriding the actual size.
     * @param {Property} [options.height] A numeric Property specifying the height of the billboard in pixels, overriding the actual size.
     * @param {Property} [options.color=Color.WHITE] A {@link Color} Property specifying the tint color of the image.
     * @param {Property} [options.scaleByDistance] A {@link NearFarScalar} Property used to scale the point based on distance.
     * @param {Property} [options.translucencyByDistance] A {@link NearFarScalar} Property used to set translucency based on distance.
     * @param {Property} [options.pixelOffsetScaleByDistance] A {@link NearFarScalar} Property used to set pixelOffset based on distance.
     * @param {Property} [options.imageSubRegion] A Property specifying a {@link BoundingRectangle} that defines a sub-region of the image to use for the billboard, rather than the entire image.
     *
     * @demo {@link http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Billboards.html|Cesium Sandcastle Billboard Demo}
     */
    var BillboardGraphics = function(options) {
        this._image = undefined;
        this._imageSubscription = undefined;
        this._imageSubRegion = undefined;
        this._imageSubRegionSubscription = undefined;
        this._width = undefined;
        this._widthSubscription = undefined;
        this._height = undefined;
        this._heightSubscription = undefined;
        this._scale = undefined;
        this._scaleSubscription = undefined;
        this._rotation = undefined;
        this._rotationSubscription = undefined;
        this._alignedAxis = undefined;
        this._alignedAxisSubscription = undefined;
        this._horizontalOrigin = undefined;
        this._horizontalOriginSubscription = undefined;
        this._verticalOrigin = undefined;
        this._verticalOriginSubscription = undefined;
        this._color = undefined;
        this._colorSubscription = undefined;
        this._eyeOffset = undefined;
        this._eyeOffsetSubscription = undefined;
        this._pixelOffset = undefined;
        this._pixelOffsetSubscription = undefined;
        this._show = undefined;
        this._showSubscription = undefined;
        this._scaleByDistance = undefined;
        this._scaleByDistanceSubscription = undefined;
        this._translucencyByDistance = undefined;
        this._translucencyByDistanceSubscription = undefined;
        this._pixelOffsetScaleByDistance = undefined;
        this._pixelOffsetScaleByDistanceSubscription = undefined;
        this._definitionChanged = new Event();

        this.merge(defaultValue(options, defaultValue.EMPTY_OBJECT));
    };

    defineProperties(BillboardGraphics.prototype, {
        /**
         * Gets the event that is raised whenever a property or sub-property is changed or modified.
         * @memberof BillboardGraphics.prototype
         *
         * @type {Event}
         * @readonly
         */
        definitionChanged : {
            get : function() {
                return this._definitionChanged;
            }
        },

        /**
         * Gets or sets the Property specifying the Image, URI, or Canvas to use for the billboard.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        image : createPropertyDescriptor('image'),

        /**
         * Gets or sets the Property specifying a {@link BoundingRectangle} that defines a
         * sub-region of the image to use for the billboard, rather than the entire image.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        imageSubRegion : createPropertyDescriptor('imageSubRegion'),

        /**
         * Gets or sets the numeric Property specifying the uniform scale to apply to the image.
         * A scale greater than <code>1.0</code> enlarges the billboard while a scale less than <code>1.0</code> shrinks it.
         * <p>
         * <div align='center'>
         * <img src='images/Billboard.setScale.png' width='400' height='300' /><br/>
         * From left to right in the above image, the scales are <code>0.5</code>, <code>1.0</code>, and <code>2.0</code>.
         * </div>
         * </p>
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         * @default 1.0
         */
        scale : createPropertyDescriptor('scale'),

        /**
         * Gets or sets the numeric Property specifying the billboard's rotation counter clockwise
         * from {@link Billboard.alignedAxis}.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        rotation : createPropertyDescriptor('rotation'),

        /**
         * Gets or sets the {@link Cartesian3} Property specifying the billboard rotation's aligned axis.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        alignedAxis : createPropertyDescriptor('alignedAxis'),

        /**
         * Gets or sets the {@link HorizontalOrigin} Property specifying the billboard's horizontal origin.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        horizontalOrigin : createPropertyDescriptor('horizontalOrigin'),

        /**
         * Gets or sets the {@link VerticalOrigin} Property specifying the billboard's vertical origin.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        verticalOrigin : createPropertyDescriptor('verticalOrigin'),

        /**
         * Gets or sets the {@link Color} Property specifying the billboard's color.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        color : createPropertyDescriptor('color'),

        /**
         * Gets or sets the {@link Cartesian3} Property specifying the billboard's eye offset.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        eyeOffset : createPropertyDescriptor('eyeOffset'),

        /**
         * Gets or sets the {@link Cartesian2} Property specifying the billboard's pixel offset.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        pixelOffset : createPropertyDescriptor('pixelOffset'),

        /**
         * Gets or sets the boolean Property specifying the billboard's visibility.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        show : createPropertyDescriptor('show'),

        /**
         * Gets or sets the numeric Property specifying the billboard's width in pixels.
         * If undefined, the native width is used.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        width : createPropertyDescriptor('width'),

        /**
         * Gets or sets the numeric Property specifying the billboard's height in pixels.
         * If undefined, the native height is used.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        height : createPropertyDescriptor('height'),

        /**
         * Gets or sets the {@link NearFarScalar} Property used to scale billboards based on distance.
         * If undefined, a constant size is used.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        scaleByDistance : createPropertyDescriptor('scaleByDistance'),

        /**
         * Gets or sets the {@link NearFarScalar} Property used to set translucency based on distance.
         * If undefined, a constant size is used.
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        translucencyByDistance : createPropertyDescriptor('translucencyByDistance'),

        /**
         * Gets or sets the {@link NearFarScalar} Property used to set pixel offset scaling based on distance.
         * If undefined, no additional scale is applied to the pixel offset
         * @memberof BillboardGraphics.prototype
         * @type {Property}
         */
        pixelOffsetScaleByDistance : createPropertyDescriptor('pixelOffsetScaleByDistance')
    });

    /**
     * Duplicates this instance.
     *
     * @param {BillboardGraphics} [result] The object onto which to store the result.
     * @returns {BillboardGraphics} The modified result parameter or a new instance if one was not provided.
     */
    BillboardGraphics.prototype.clone = function(result) {
        if (!defined(result)) {
            return new BillboardGraphics(this);
        }
        result.color = this._color;
        result.eyeOffset = this._eyeOffset;
        result.horizontalOrigin = this._horizontalOrigin;
        result.image = this._image;
        result.imageSubRegion = this._imageSubRegion;
        result.pixelOffset = this._pixelOffset;
        result.scale = this._scale;
        result.rotation = this._rotation;
        result.alignedAxis = this._alignedAxis;
        result.show = this._show;
        result.verticalOrigin = this._verticalOrigin;
        result.width = this._width;
        result.height = this._height;
        result.scaleByDistance = this._scaleByDistance;
        result.translucencyByDistance = this._translucencyByDistance;
        result.pixelOffsetScaleByDistance = this._pixelOffsetScaleByDistance;
        return result;
    };

    /**
     * Assigns each unassigned property on this object to the value
     * of the same property on the provided source object.
     *
     * @param {BillboardGraphics} source The object to be merged into this object.
     */
    BillboardGraphics.prototype.merge = function(source) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(source)) {
            throw new DeveloperError('source is required.');
        }
        //>>includeEnd('debug');

        this.color = defaultValue(this._color, source.color);
        this.eyeOffset = defaultValue(this._eyeOffset, source.eyeOffset);
        this.horizontalOrigin = defaultValue(this._horizontalOrigin, source.horizontalOrigin);
        this.image = defaultValue(this._image, source.image);
        this.imageSubRegion = defaultValue(this._imageSubRegion, source.imageSubRegion);
        this.pixelOffset = defaultValue(this._pixelOffset, source.pixelOffset);
        this.scale = defaultValue(this._scale, source.scale);
        this.rotation = defaultValue(this._rotation, source.rotation);
        this.alignedAxis = defaultValue(this._alignedAxis, source.alignedAxis);
        this.show = defaultValue(this._show, source.show);
        this.verticalOrigin = defaultValue(this._verticalOrigin, source.verticalOrigin);
        this.width = defaultValue(this._width, source.width);
        this.height = defaultValue(this._height, source.height);
        this.scaleByDistance = defaultValue(this._scaleByDistance, source.scaleByDistance);
        this.translucencyByDistance = defaultValue(this._translucencyByDistance, source.translucencyByDistance);
        this.pixelOffsetScaleByDistance = defaultValue(this._pixelOffsetScaleByDistance, source.pixelOffsetScaleByDistance);
    };

    return BillboardGraphics;
});
