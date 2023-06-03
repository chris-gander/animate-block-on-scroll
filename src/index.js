/* Add custom attribute to image block, in Sidebar */
import { __ } from '@wordpress/i18n';

import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, __experimentalNumberControl as NumberControl } from '@wordpress/components'

/**
 * Declare our custom attribute
 */
const setSidebarSelectAttribute = ( settings, name ) => {
    return Object.assign( {}, settings, {
        attributes: Object.assign( {}, settings.attributes, {
            aos: { type: 'string' },
			aosDuration: { type: 'number' }
        } ),
    } );
};
wp.hooks.addFilter(
    'blocks.registerBlockType',
    'animate-block-on-scroll/set-sidebar-select-attribute',
    setSidebarSelectAttribute
);

/**
 * Add Custom Select to Image Sidebar
 */
const withSidebarSelect = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        const { attributes, setAttributes } = props;
        const { aos, aosDuration } = attributes;

        return (
            <Fragment>
                <BlockEdit { ...props } />
                <InspectorControls>
                	<PanelBody
    	                title={ __( 'Animate On Scroll Settings' ) }
    	            >
	                    <SelectControl
                            label={ __( 'Animation' ) }
                            value={ aos }
                            options={ [
                                {
                                    label: __( 'None' ),
                                    value: ''
                                },
                                {
                                    label: __( 'Fade Up' ),
                                    value: 'fade-up'
                                },
                                {
                                    label: __( 'Fade Down' ),
                                    value: 'fade-down'
                                },
                                {
                                    label: __( 'Fade Left' ),
                                    value: 'fade-left'
                                },
                                {
                                    label: __( 'Fade Right' ),
                                    value: 'fade-right'
                                },
                                {
                                    label: __( 'Fade Up Left' ),
                                    value: 'fade-up-left'
                                },
                                {
                                    label: __( 'Fade Up Right' ),
                                    value: 'fade-up-right'
                                },
                                {
                                    label: __( 'Fade Down Left' ),
                                    value: 'fade-down-left'
                                },
                                {
                                    label: __( 'Fade Down Right' ),
                                    value: 'fade-down-right'
                                },
                                {
                                    label: __( 'Flip Up' ),
                                    value: 'flip-up'
                                },
                                {
                                    label: __( 'Flip Down' ),
                                    value: 'flip-down'
                                },
                                {
                                    label: __( 'Flip Left' ),
                                    value: 'flip-left'
                                },
                                {
                                    label: __( 'Flip Right' ),
                                    value: 'flip-right'
                                },
                                {
                                    label: __( 'Zoom In' ),
                                    value: 'zoom-in'
                                },
                                {
                                    label: __( 'Zoom In Up' ),
                                    value: 'zoom-in-up'
                                },
                                {
                                    label: __( 'Zoom In Down' ),
                                    value: 'zoom-in-down'
                                },
                                {
                                    label: __( 'Zoom In Left' ),
                                    value: 'zoom-in-left'
                                },
                                {
                                    label: __( 'Zoom In Right' ),
                                    value: 'zoom-in-right'
                                },
                                {
                                    label: __( 'Zoom Out' ),
                                    value: 'zoom-out'
                                },
                                {
                                    label: __( 'Zoom Out Up' ),
                                    value: 'zoom-out-up'
                                },
                                {
                                    label: __( 'Zoom Out Down' ),
                                    value: 'zoom-out-down'
                                },
                                {
                                    label: __( 'Zoom Out Left' ),
                                    value: 'zoom-out-left'
                                },
                                {
                                    label: __( 'Zoom Out Right' ),
                                    value: 'zoom-out-right'
                                }
                            ] }
                            onChange={ ( value ) => {
                                setAttributes( {
                                    aos: value,
                                } );
                            } }
                        /> 
						<NumberControl
							label={ __( 'Animation Duration (milliseconds)' ) }
							onChange={ ( value ) => {
                                setAttributes( {
                                    aosDuration: value,
                                } );
                            } }
							value={ aosDuration ?? 1000 }
						/>
	                </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withSidebarSelect' );

wp.hooks.addFilter(
    'editor.BlockEdit',
    'animate-block-on-scroll/with-sidebar-select',
    withSidebarSelect
);

/**
 * Add custom class to block in Edit
 */
const withSidebarSelectProp = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
        const { attributes } = props;
        const { aos, aosDuration } = attributes;
		
        if ( aos ) {
            return <BlockListBlock { ...props } data-aos={ aos } data-aos-duration={aosDuration} />
        } else {
            return <BlockListBlock { ...props } />
        }
    };
}, 'withSidebarSelectProp' );

wp.hooks.addFilter(
    'editor.BlockListBlock',
    'animate-block-on-scroll/with-sidebar-select-prop',
    withSidebarSelectProp
);


/**
 * Save our custom attribute
 */
const saveSidebarSelectAttribute = ( extraProps, blockType, attributes ) => {
    const { aos, aosDuration } = attributes;
    if ( aos ) {
		return {
			...extraProps,
			'data-aos': aos,
			'data-aos-duration': aosDuration ?? 1000
		}
    }  

    return extraProps;

};
wp.hooks.addFilter(
    'blocks.getSaveContent.extraProps',
    'animate-block-on-scroll/save-sidebar-select-attribute',
    saveSidebarSelectAttribute
);