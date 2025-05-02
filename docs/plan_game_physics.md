1 Introduction
1.1 A Brief History of the World
1.2 A Summary of the Topics
1.3 Examples and Exercises
2 Basic Concepts
2.1 Rigid Body Classification
2.2 Rigid Body Kinematics
2.2.1 Single Particle
2.2.2 Particle Systems and Continuous Materials
2.3 Newton's Laws
2.4 Forces
2.4.1 Gravitational Forces
2.4.2 Spring Forces
2.4.3 Friction and Other Dissipative Forces
2.4.4 Torque
2.4.5 Equilibrium
2.5 Momenta
2.5.1 Linear Momentum
2.5.2 Angular Momentum
2.5.3 Center of Mass
2.5.4 Moments and Products of Inertia
2.5.5 Mass and Inertia Tensor of a Solid Polyhedron
2.6 Energy
2.6.1 Work and Kinetic Energy
2.6.2 Conservative Forces and Potential Energy

3 Rigid Body Motion
3.1 Newtonian Dynamics
3.2 Lagrangian Dynamics
3.2.1 Equations of Motion for a Particle
3.2.2 Time-Varying Frames or Constraints
3.2.3 Interpretation of the Equations of Motion
3.2.4 Equations of Motion for a System of Particles
3.2.5 Equations of Motion for a Continuum of Mass
3.2.6 Examples with Conservative Forces
3.2.7 Examples with Dissipative Forces
3.3 Euler's Equations of Motion

4 Deformable Bodies
4.1 Elasticity, Stress, and Strain
4.2 Mass-Spring Systems
4.2.1 One-Dimensional Array of Masses
4.2.2 Two-Dimensional Array of Masses
4.2.3 Three-Dimensional Array of Masses
4.2.4 Arbitrary Configurations
4.3 Control Point Deformation
4.3.1 B-Spline Curves
4.3.2 NURBS Curves
4.3.3 B-Spline Surfaces
4.3.4 NURBS Surfaces
4.3.5 Surfaces Built from Curves
4.4 Free-Form Deformation
4.5 Implicit Surface Deformation
4.5.1 Level Set Extraction
4.5.2 Isocurve Extraction in 2D Images
4.5.3 Isosurface Extraction in 3D Images
5 Fluids and Gases
5.1 Vector Calculus
5.1.1 Gradient, Directional Derivative, and Total Derivative
5.1.2 Vector Fields, Divergence, and Laplacian
5.1.3 Curl
5.1.4 Line Integrals
5.1.5 Surface Integrals and Stokes' Theorem
5.1.6 Volume Integrals and the Divergence Theorem
5.1.7 Green's Theorem, Laplace Equation, and Poisson's Equation
5.1.8 Vector Field Decomposition
5.2 Strain and Stress
5.2.1 Strain Tensor
5.2.2 Stress Tensor
5.2.3 The Relationship Between Strain and Stress
5.3 Conservation Laws
5.3.1 Conservation of Mass
5.3.2 Conservation of Momentum
5.4 A Simplified Model for Fluid Flow
5.5 Implementing the Simplified 2D Model
5.5.1 The Density Equation
5.5.2 The Diffusion Term
5.5.3 The Advection Term
5.5.4 The Source-Sink Term
5.5.5 The Total Density Update
5.5.6 The Velocity Equations
5.5.7 Specialized Boundary Handling
5.6 Implementing the Simplified 3D Model
5.7 Variations of the Simplified Model
5.7.1 Vorticity Confinement and Vortex Particles
5.7.2 Separate Pressure Term
5.7.3 Omit Diffusion Terms
5.7.4 Density and Velocity Dissipation
5.7.5 Include Temperature
5.7.6 Compressible Flow
5.7.7 Obstacles in the Fluid Region
5.7.8 Moving Boundaries and Multiple Fluids
5.7.9 Finding Papers on Fluid Simulation
6 Physics Engines
6.1 The Physics Tick
6.2 Collision Culling
6.2.1 Culling with Bounding Spheres
6.2.2 Culling with Axis-Aligned Bounding Boxes
6.2.3 AABB Culling in a Single-Threaded Environment
6.2.4 AABB Culling Using a Separate Core of a CPU
6.2.5 AABB Culling Using a Specialized Processor
6.3 Test-Intersection Queries
6.3.1 Spheres
6.3.2 Capsules
6.3.3 Ellipsoids
6.3.4 Cylinders
6.4 Collision Detection with Convex Polyhedra
6.4.1 The Method of Separating Axes
6.4.2 Stationary Objects
6.4.3 Objects Moving with Constant Linear Velocity
6.4.4 Oriented Bounding Boxes
6.4.5 Boxes Moving with Constant Linear and Angular Velocity
6.4.6 GJK Algorithm
6.5 Unconstrained Motion
6.6 Acceleration-Based Constrained Motion
6.6.1 Collision Points
6.6.2 Collision Response for Colliding Contact
6.6.3 Collision Response for Resting Contact
6.6.4 An Illustrative Implementation
6.6.5 Lagrangian Dynamics
6.7 Velocity-Based Constrained Motion
6.7.1 Constraint on a Particle
6.7.2 Constraints on a Particle System
6.7.3 Constraint on a Rigid Body
6.7.4 Constraints on a Rigid Body System
6.7.5 Comments and Variations on the Algorithm
6.8 Variations
7 Linear Algebra
7.1 A Review of Number Systems
7.1.1 The Integers
7.1.2 The Rational Numbers
7.1.3 The Real Numbers
7.1.4 The Complex Numbers
7.1.5 Fields
7.2 Systems of Linear Equations
7.2.1 A Closer Look at Two Equations in Two Unknowns
7.2.2 Gaussian Elimination and Elementary Row Operations
7.2.3 Nonsquare Systems of Equations
7.2.4 The Geometry of Linear Systems
7.2.5 Numerical Issues
7.2.6 Iterative Methods for Solving Linear Systems
7.3 Matrices
7.3.1 Some Special Matrices
7.3.2 Elementary Row Matrices
7.3.3 Inverse Matrices
7.3.4 Properties of Inverses
7.3.5 Construction of Inverses
7.3.6 LU Decomposition
7.4 Vector Spaces
7.4.1 Definition of a Vector Space
7.4.2 Linear Combinations, Spans, and Subspaces
7.4.3 Linear Independence and Bases
7.4.4 Inner Products, Length, Orthogonality, and Projection
7.4.5 Dot Product, Cross Product, and Triple Products
7.4.6 Orthogonal Subspaces
7.4.7 The Fundamental Theorem of Linear Algebra
7.4.8 Projection and Least Squares
7.4.9 Linear Transformations
7.5 Advanced Topics
7.5.1 Determinants
7.5.2 Eigenvalues and Eigenvectors
7.5.3 Eigendecomposition for Symmetric Matrices
7.5.4 S + N Decomposition
7.5.5 Applications
8 Affine Algebra
8.1 Introduction
8.2 Coordinate Systems
8.3 Subspaces
8.4 Transformations
8.5 Barycentric Coordinates
8.5.1 Triangles
8.5.2 Tetrahedra
8.5.3 Simplices
8.5.4 Length, Area, Volume, and Hypervolume
9 Calculus
9.1 Univariate Calculus
9.1.1 Limits
9.1.2 Limits of a Sequence
9.1.3 Continuity
9.1.4 Differentiation
9.1.5 L'Hopital's Rule
9.1.6 Integration
9.2 Multivariate Calculus
9.2.1 Limits and Continuity
9.2.2 Differentiation
9.2.3 Integration
9.3 Applications
9.3.1 Optimization
9.3.2 Constrained Optimization
9.3.3 Derivative Approximations by Finite Differences
10 Quaternions
10.1 Rotation Matrices
10.2 The Classical Approach
10.2.1 Algebraic Operations
10.2.2 Relationship of Quaternions to Rotations
10.3 A Linear Algebraic Approach
10.4 Interpolation of Quaternions
10.4.1 Spherical Linear Interpolation
10.4.2 Spherical Quadratic Interpolation
10.5 Derivatives of Time-Varying Quaternions
11 Differential Equations
11.1 First-Order Equations
11.2 Existence, Uniqueness, and Continuous Dependence
11.3 Second-Order Equations
11.4 General-Order Equations
11.5 Systems of Linear Differential Equations
11.6 Equilbria and Stability
11.6.1 Stability for Constant-Coefficient Linear Systems
11.6.2 Stability for General Autonomous Systems
12 Ordinary Difference Equations
12.1 Definitions
12.2 Linear Equations
12.2.1 First-Order Linear Equations
12.2.2 Second-Order Linear Equations
12.3 Constant Coefficient Equations
12.4 Systems of Equations
13 Numerical Methods
13.1 Euler's Method
13.2 Higher-Order Taylor Methods
13.3 Methods Via an Integral Formulation
13.4 Runge-Kutta Methods
13.4.1 Second-Order Methods
13.4.2 Third-Order Methods
13.4.3 Fourth-Order Methods
13.5 Multistep Methods
13.6 Predictor-Corrector Methods
13.7 Extrapolation Methods
13.7.1 Richardson Extrapolation
13.7.2 Application to Differential Equations
13.7.3 Polynomial Interpolation and Extrapolation
13.7.4 Rational Polynomial Interpolation and Extrapolation
13.7.5 Modified Midpoint Method
13.7.6 Bulirsch-Stoer Method
13.8 Verlet Integration
13.8.1 Forces without a Velocity Component
13.8.2 Forces with a Velocity Component
13.8.3 Simulating Drag in a System
13.8.4 Leap Frog Method
13.8.5 Velocity Verlet Method
13.8.6 Gear's Fifth-Order Predictor-Corrector Method
13.9 Numerical Stability and its Relationship to Physical Stability
13.9.1 Stability for Single-Step Methods
13.9.2 Stability for Multistep Methods
13.9.3 Choosing a Stable Step Size
13.10 Stiff Equations
14 Linear Complementarity and Mathematical Programming
14.1 Linear Programming
14.1.1 A Two-Dimensional Example
14.1.2 Solution by Pairwise Intersections
14.1.3 Statement of the General Problem
14.1.4 The Dual Problem
14.2 The Linear Complementarity Problem
14.1.1 The Lemke-Howson Algorithm
14.1.2 Zero Constant Terms
14.1.3 The Complementary Variable cannot Leave the Dictionary
14.3 Mathematical Programming
14.3.1 Karush-Kuhn-Tucker Conditions
14.3.2 Convex Quadratic Programming
14.3.3 General Duality Theory
14.4 Applications
14.4.1 Distance Calculations
14.4.2 Contact Forces
