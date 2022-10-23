/** All the shapes in our world are made out of a material */
export class Material {
    getColorAt = () => { throw("Classes which extend Material must implement getColorAt"); }
}
