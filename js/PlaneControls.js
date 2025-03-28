import {
	Controls,
	Quaternion,
	Vector3
} from 'three';

const _changeEvent = { type: 'change' };

const _EPS = 0.000001;
const _tmpQuaternion = new Quaternion();

class PlaneControls extends Controls {

	constructor( object, domElement = null ) {

		super( object, domElement );

		this.movementSpeed = 7.0;
		this.rollSpeed = 0.05;
        this.yawMult = 0.002;

		// internals
		this._moveState = { 
            pitchUp: 0, pitchDown: 0, 
            rollLeft: 0, rollRight: 0,
			speedup: 0, speeddown: 0,
        };
		this._moveVector = new Vector3( 0, 0, 0 );
		this._rotationVector = new Vector3( 0, 0, 0 );
		this._lastQuaternion = new Quaternion();
		this._lastPosition = new Vector3();
		this._status = 0;
        this._roll = 0;
        this._pitch_rate = 0;

		// event listeners
		this._onKeyDown = onKeyDown.bind( this );
		this._onKeyUp = onKeyUp.bind( this );
        window.addEventListener( 'keydown', this._onKeyDown );
		window.addEventListener( 'keyup', this._onKeyUp );
	}

	dispose() {
		window.removeEventListener( 'keydown', this._onKeyDown );
		window.removeEventListener( 'keyup', this._onKeyUp );
	}

	update( delta ) {

		if ( this.enabled === false ) return;

		const object = this.object;
		
		this.movementSpeed += this.accel * delta * 10;
		const moveMult = delta * this.movementSpeed;
		const rotMult = delta * this.rollSpeed;
		

		object.translateX( this._moveVector.x * moveMult );
		object.translateY( this._moveVector.y * moveMult );
		object.translateZ( this._moveVector.z * moveMult );

		_tmpQuaternion.set( 
            this._rotationVector.x * rotMult, 
            Math.tan(this._roll) * this.yawMult, 
            this._rotationVector.z * rotMult, 
            1 
        ).normalize();
		object.quaternion.multiply( _tmpQuaternion );

        const up        = new Vector3(0, 1, 0);            
        const cam_front = new Vector3(0, 0, -1).applyQuaternion(object.quaternion);
        const cam_up    = up.clone().applyQuaternion(object.quaternion);
        const cam_right = cam_front.clone().cross(cam_up);
        
        this._pitch_rate = cam_front.y / Math.sqrt(cam_front.x * cam_front.x + cam_front.z * cam_front.z);
        this._roll = Math.atan2(cam_right.dot(up), cam_up.dot(up));
        if (
			this._lastPosition.distanceToSquared( object.position ) > _EPS ||
			8 * ( 1 - this._lastQuaternion.dot( object.quaternion ) ) > _EPS
		) {
			this.dispatchEvent( _changeEvent );
			this._lastQuaternion.copy( object.quaternion );
			this._lastPosition.copy( object.position );
		}
	}

	// private
	_onKeyEvent(event, value) {
        if( this.enabled === false ) return;

        switch ( event.code ) {
            case 'KeyS': this._moveState.pitchUp = value; break;
            case 'KeyW': this._moveState.pitchDown = value; break;
            case 'KeyA': this._moveState.rollLeft = value; break;
            case 'KeyD': this._moveState.rollRight = value; break;
			case 'Space': this._moveState.speedup = value; break;
			case 'ControlLeft': this._moveState.speeddown = value; break;	
        }

		this.accel = -this._moveState.speeddown + this._moveState.speedup;
		this._moveVector.x = 0;
		this._moveVector.y = 0;
		this._moveVector.z = -1;
		this._rotationVector.x = - this._moveState.pitchDown + this._moveState.pitchUp;
		this._rotationVector.y = 0;
		this._rotationVector.z = - this._moveState.rollRight + this._moveState.rollLeft;
	}

    getRoll() {
        return this._roll;
    }
    getPitchRate() {
        return this._pitch_rate;
    }
}

function onKeyDown( event ) {
	if ( event.altKey ) return;
    this._onKeyEvent(event, 1);
}

function onKeyUp( event ) {
    this._onKeyEvent(event, 0);
}

export { PlaneControls };