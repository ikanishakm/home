export default  `
vec3 hash3d(vec3 p) {
  return fract(
      sin(vec3(dot(p, vec3(1.0, 57.0, 113.0)), dot(p, vec3(57.0, 113.0, 1.0)),
               dot(p, vec3(113.0, 1.0, 57.0)))) *
      43758.5453);
}

// voronoi implementation largely referenced from https://www.shadertoy.com/view/MslGD8
vec2 voronoi( in vec3 x, in float time )
{
    // current cell coordinates
    vec3 n = floor(x);
    // pixel coordinates in current cell
    vec3 f = fract(x);

    // initialize m with a large number
    // (which will be get replaced very soon with smaller distances below)
    vec4 m = vec4(8.0);

    // in 2D voronoi, we only have 2 dimensions to loop over
    // in 3D, we would naturally have one more dimension to loop over
    for( int k=-1; k<=1; k++ ) {
        for( int j=-1; j<=1; j++ ) {
            for( int i=-1; i<=1; i++ )
            {
                // coordinates for the relative cell  within the 3x3x3 3D grid
                vec3 g = vec3(float(i),float(j),float(k));
                // calculate a random point within the cell relative to 'n'(current cell coordinates)
                vec3 o = hash3d( n + g );
                // calculate the distance vector between the current pixel and the moving random point 'o'
                vec3 r = g + (0.5+0.5*sin(vec3(time)+6.2831*o)) - f;
                // calculate the scalar distance of r
                float d = dot(r,r);

                // find the minimum distance
                // it is most important to save the minimum distance into the result 'm'
                // saving other information into 'm' is optional and up to your liking
                // e.g. displaying different colors according to various cell coordinates
                if( d<m.x )
                {
                    m = vec4( d, o );
                }
            }
        }
    }

    return vec2(m.x, m.y+m.z+m.w);
}

uniform float u_time;
uniform float u_bFactor;
uniform float u_pcurveHandle;
varying vec3 v_pos;

// Function from Iñigo Quiles
// www.iquilezles.org/www/articles/functions/functions.htm
// for visual demo, go to https://thebookofshaders.com/edit.php#05/parabola.frag
float parabola( float x, float k ){
    return pow(4.*x*(1.-x), k);
}

// Function from Iñigo Quiles
// www.iquilezles.org/www/articles/functions/functions.htm
// for visual demo, go to https://thebookofshaders.com/edit.php#05/pcurve.frag
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

void main() {
    vec2 res = voronoi(v_pos*2., u_time*0.3);
    // darken by pow
    vec3 mycolor = vec3(pow(res.x, 1.5));
    // emphasis on blue
    float blue = 0.0/255.0;
    // // cut off the blueness at the top end of the spectrum
    mycolor.b = blue * (1. - smoothstep(0.9,1.0,res.x));
    // adjust red+greeness using pcurve such that greyness/whiteness
    // is only seen at a limited range within the spectrum
    mycolor.r = pcurve(mycolor.r, 8.0, u_pcurveHandle + 1.);
    mycolor.g = pcurve(mycolor.g, 12.4, u_pcurveHandle + .5);
    gl_FragColor = vec4( mycolor, 1.0 );
}`