class DFlipFlop extends Gate {
    constructor(context, x, y) {
        super(context, false, x, y, undefined);
        this.noChange = true;
        this.setInputAmount(2);
        this.setOutputAmount(1);
        this.transform.setSize(this.transform.size.scale(1.5));
    }
    onTransformChange() {
        this.transform.setSize(V(DEFAULT_SIZE, DEFAULT_SIZE));
        super.onTransformChange();
        this.transform.setSize(V(DEFAULT_SIZE*1.5, DEFAULT_SIZE*1.5));
    }
    activate(x) {
        var on = this.outputs[0].isOn;

        var set = this.inputs[0].isOn;
        var clock = this.inputs[1].isOn;
        if (clock) {
            if (set) {
                on = true;
            } else {
                on = false;
            }
        }

        super.activate(on, 0);
        super.activate(!on, 1);
    }
    draw() {
        super.draw();

        var renderer = this.context.getRenderer();
        this.localSpace();
        renderer.rect(0, 0, this.transform.size.x, this.transform.size.y, this.getCol(), this.getBorderColor());
        renderer.restore();
    }
    getDisplayName() {
        return "D Flip Flop";
    }
}
DFlipFlop.getXMLName = function() { return "dff"; }
Importer.types.push(DFlipFlop);
